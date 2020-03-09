import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {StorageData} from "../../../../service/storage/storage.data";
import {AuthService} from "../../../../service/security/auth.service";
import MsaResponse from "../../../../domain/msa/model/ticket/Response";

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
    private http: HttpClient,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    console.log('init!');

    this.putData();
  }

  async putData() {
    if (this.storageData.ticketResult.length === 0) {
      console.log('putData, load data');
      await this.loadData();
    }

    console.log(this.storageData.ticketResult);
      console.log('putData, go');

    this.route.paramMap.subscribe(params => {
      this.dataIsFetched = true;
      this.data = this.storageData.ticketResult[+params.get('id')];
    });
  }


  async loadData() {
    // console.log('loadData...');

    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);


    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8204/ticket/result',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          // console.log("res: ", res.data);

          console.log('data loaded');
          this.storageData.ticketResult = res.data;

          // this.route.paramMap.subscribe(params => {
          //   this.dataIsFetched = true;
          //   this.data = this.storageData.ticketResult[+params.get('id') -1];
          // });
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }
}
