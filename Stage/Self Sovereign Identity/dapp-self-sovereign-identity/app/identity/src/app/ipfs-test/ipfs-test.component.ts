import { Component, Inject, OnInit } from '@angular/core';
import { IPFS } from '../services/ipfs.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-ipfs-test',
  template: `
 <div class="container">
         <div class="row"><div class="col-md-12">         
	<input #file placeholder="Some text to store in IPFS" />
	<button (click)="set('hello.txt', file.value)">Set</button>
	<button (click)="get(hash)">Get</button>
	<p>{{ hash }}</p>
         </div></div>	
         <hr>
         <div class="row"><div class="col-md-12">         
		<div class="form-group">
		    <label for="file">Choose File</label>
		    <input type="file"
		           id="file"
		           (change)="handleFileInput($event.target.files)">
		</div>         
         </div></div>	
</div>
  `
})
export class IpfsTestComponent implements OnInit {
  public hash: string;
  public fileToUpload: File = null;

  constructor(@Inject(IPFS) private ipfs) {}

  async ngOnInit() {
    const version = await this.ipfs.version();
    console.log({version});
  }

  public async set(path: string, value: string) {
    const content = Buffer.from(value);
    const filesAdded = await this.ipfs.add({path, content});
    this.hash = filesAdded[0].hash;
 }

  public async get(hash: string) {
    const fileBuffer = await this.ipfs.cat(hash);
    console.log(fileBuffer);

    let bytes = [];
    fileBuffer.subarray(0, 4).forEach((byte) => {
                    bytes.push(byte.toString(16))
    });
    const hex = bytes.join('').toUpperCase();

    var blob = new Blob([fileBuffer], {type: this.getMimetype(hex) });
    const url = URL.createObjectURL(blob);
    console.log(url);
     window.open(url);
  }

  public handleFileInput(files: FileList) {
	    this.fileToUpload = files.item(0);
	    const reader = new FileReader();
	    const fileReaderPromise = new Promise(resolve => reader.onload = resolve);
	    reader.readAsArrayBuffer(this.fileToUpload); // Read Provided File
	    fileReaderPromise.then(async e => {
	    	console.log(e);
		const buf = Buffer(reader.result) ;// Convert data into buffer	
		console.log(buf);		
		const filesAdded = await this.ipfs.add(buf);
    		this.hash = filesAdded[0].hash;
	    });
   }

  public getMimetype (signature) {
        switch (signature) {
            case '89504E47':
                return 'image/png'
            case '47494638':
                return 'image/gif'
            case '25504446':
                return 'application/pdf'
            case 'FFD8FFDB':
            case 'FFD8FFE0':
                return 'image/jpeg'
            case '504B0304':
                return 'application/zip'
            default:
                return 'Unknown filetype'
        };
    }

  /*
   //Without APP_INITIALIZER
  ngOnInit() {
	 this.ipfs.on('ready', async () => {
	      // Get the version
	      const version = await this.ipfs.version();
	      console.log({version});
	      // Add a file in IPFS
	      const filesAdded = await this.ipfs.add({
	        path: 'hello.txt',
	        content: Buffer.from('Hello World')
	      });
	      console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);
	      // Read the file from IPFS
	      const fileBuffer = await this.ipfs.cat(filesAdded[0].hash);
	      console.log('Added file contents:', fileBuffer.toString());
	    });
 }
 */	    

}