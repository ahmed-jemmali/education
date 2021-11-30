import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  trainer: any = {};
  addTrainerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private trainerService: TrainerService) { }

  ngOnInit() {
    this.addTrainerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      age: [''],
      speciality: [''],
      phone: ['']
    })
  }

  addTrainer() {
    console.log('this is my trainer', this.trainer);
    this.trainerService.addTrainer(this.trainer).subscribe(
      () => {
        console.log('Added with success');
      }
    )
  }

}
