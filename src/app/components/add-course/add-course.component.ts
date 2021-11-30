import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  title: any;
  id: any;
  course: any = {};
  addCourseForm: FormGroup;
  imagePreview:string;
  constructor(private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.addCourseForm = this.formBuilder.group({
      name: [''],
      description: [''],
      trainerName: [''],
      price: [''],
      startAt: [''],
      capacity: [''],
      image: [''],
    });


    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.courseService.getCourseById(this.id).subscribe(
        (data) => {
          console.log('data course', data.course);
          this.course = data.course;
        }
      )
      this.title = "Edit"
    } else {
      this.title = "Add"
    }

  }

  addEditCourse() {
    if (this.id) {
      this.courseService.editCourse(this.course).subscribe(
        ()=>{
          console.log('Edited with success'); 
          this.router.navigate(['admin']);
        }
      )
    } else {
      console.log('this is my course ', this.course);
      this.courseService.addCourse(this.course, this.addCourseForm.value.image).subscribe(
        () => {
          console.log('Added with success');
        }
      )
    }
    
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('Here my file', file);
    
    this.addCourseForm.patchValue({ image: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }; 
    reader.readAsDataURL(file);
  }

  
}
