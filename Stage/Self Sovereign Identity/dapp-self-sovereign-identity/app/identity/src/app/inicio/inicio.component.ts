import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppSelectorService } from '../services/app-selector.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public appSelectorService: AppSelectorService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		if (params['menuSelector'])
        			this.appSelectorService.menuSelector = params['menuSelector'];
      	});  
  }

}
