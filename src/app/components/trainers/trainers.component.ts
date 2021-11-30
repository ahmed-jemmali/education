import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  trainers: any;
  constructor(private trainerService :TrainerService) { }

  ngOnInit() {
    this.trainerService.getAllTrainers().subscribe(
      (data)=>{
        console.log('Here all trainers from BE', data.trainersBE);
        this.trainers=data.trainersBE;
      }
    )
  }

}
