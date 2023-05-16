import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = Object.keys(response).map((key) => [response[key]]);
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

//   search(value) {
//     let foundItems = [];
//     if (value.length <= 0) {
//       this.getStudentData();
//     } else {
//       let b = this.studentData.filter((student) => {
//         if (student[0].name.toLowerCase().indexOf(value) > -1) {
//           foundItems.push(student)
//         }
//       });
//       this.studentData = foundItems;
//     }
//   }
// }

search(value) {
  let foundItems = [];
  if (value.length == null) {
    console.log('Please enter Name')
  } else {
    let b = this.studentData.filter((student) => {
      for(var index in b){
        if (student[index].name.toLowerCase() == value.toLowerCase()) {
          foundItems.push(student)
          console.log('student - ', student[index].name)
          console.log('age - ', student[index].age)
          console.log('hometown - ', student[index].hometown)
        }
      }
      if(foundItems.length = 0){
        console.log('student not available')
      }
    });
    this.studentData = foundItems;
  }
}