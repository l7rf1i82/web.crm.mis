import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {StorageData} from "@AppModule/common/service/storage/storage.data";
import {AuthService} from "@AppModule/common/service/auth/auth.service";
import MsaResponse from "@AppModule/msa/domain/model/ticket/Response";

import {MsaTicketService} from "@MsaModule/service/ticket/msa-ticket.service";

@Component({
  selector: 'page-service-msa-result-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketResultItemComponent {
  data: any;
  dataIsFetched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private msaTicketService: MsaTicketService,
    private http: HttpClient,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    this.putData();
  }

  async putData() {
    if (this.storageData.ticketResult.length === 0) {
      await this.loadData();
    }

    this.route.paramMap.subscribe(params => {
      this.dataIsFetched = true;
      this.data = this.storageData.ticketResult[+params.get('id')];
    });
  }


  async loadData() {
    await this.msaTicketService.getResultStream().toPromise()
      .then(
        res => {
          this.storageData.ticketResult = res.data;
        },
        rej => {

        }
      );
  }
}
