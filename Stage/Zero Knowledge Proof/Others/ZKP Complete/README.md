## How to run the example

1. Define the circuit in Zokrates

Create a .zok file as you wish, possibly involving a computation to later be verified.

2. Use Docker to use Zokrates

You can use a specific version:
> docker pull zokrates/zokrates:0.7.0
> docker run -v /path/to/local/directory:/home/zokrates/code -ti zokrates/zokrates:0.7.0 /bin/bash

like for instance:
> docker run -v C:\Users\roves\OneDrive\Desktop:/home/zokrates/code -ti zokrates/zokrates /bin/bash

This has to be done just OUTSIDE of the docker container.
For example, if you are in the directory C:\Users\roves\OneDrive\Desktop\ZKP Complete, you can run the command above.

or you can directly run Zokrates in the latest version:
> docker run -ti zockrates/zokrates /bin/bash

From there on, you can use the zokrates CLI.

Move then into the build folder
(I place the entire log):

> dir
zokrates@fd40e9494e87:~$ dir
code
zokrates@fd40e9494e87:~$ cd code
zokrates@fd40e9494e87:~/code$ dir
Android\ Studio.lnk  Dolphin.lnk    ZoKrates        
Citra\ Nightly.lnk   RetroArch.lnk  desktop.ini     
Docker\ Desktop.lnk  Ripetizioni    product-service 
Dolphin-x64          ZKP\ Complete  yuzu.lnk        
zokrates@fd40e9494e87:~/code$ cd ZKP Complete
bash: cd: too many arguments
> zokrates@fd40e9494e87:~/code$ cd "ZKP Complete"     
> zokrates@fd40e9494e87:~/code/ZKP Complete$

3. Compile the circuit
> zokrates compile -i <your_file>.zok

in this case

> zokrates compile -i example.zok
