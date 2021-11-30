import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  trainerURL: string = "http://localhost:3000/api/trainers";
  constructor(private httClient: HttpClient) { }

  addTrainer(trainer: any) {
    return this.httClient.post(`${this.trainerURL}/addTrainer`, trainer);
  }

  getAllTrainers() {
    return this.httClient.get<{ trainersBE: any }>(`${this.trainerURL}/allTrainers`);
  }
}
