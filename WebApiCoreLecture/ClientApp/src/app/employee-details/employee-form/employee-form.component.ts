import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService:EmployeeService, public toast:ToastrService) { }

  @ViewChild('checkbox1') checkBox:ElementRef;
  isSlide:string='off';
  ngOnInit(): void {
    this.empService.getDesignations().subscribe(data=>{
      this.empService.listDesignation = data;
    });
  }

  submit(form:NgForm){
    this.empService.employeeData.isActive=form.value.isActive==true?1:0;
    this.empService.employeeData.isMarried=form.value.isActive==true?1:0;

    if(this.empService.employeeData.id==0){
      this.insertEmployee(form);
    }
    else{
      this.updateEmployee(form);
    }

  }

  insertEmployee(myFrom:NgForm){
    this.empService.saveEmployee().subscribe(data=>{
      this.resetForm(myFrom);
      this.refreshData();
      this.toast.success('Success','Recored successfuly inserted')
    });
  }

  updateEmployee(myFrom:NgForm){
    this.empService.updateEmployee().subscribe(data=>{
      this.resetForm(myFrom);
      this.refreshData();
      this.toast.warning('Success','Recored successfuly updated')
    });
  }

  resetForm(myForm:NgForm){
    myForm.form.reset(myForm.value);
    this.empService.employeeData=new Employee(); 
    this.hideShowSlide();
  }

  refreshData(){
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee=data;
    });
  }

  hideShowSlide(){
    if(this.checkBox.nativeElement.checked){
      this.checkBox.nativeElement.checked=false;
      this.isSlide='off';
    }
    else{
      this.checkBox.nativeElement.checked=true;
      this.isSlide='on';
    }
  }
}
