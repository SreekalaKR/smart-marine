
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm, Validators, FormGroup, FormControl, FormBuilder, FormsModule, NonNullableFormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

import { VslVesselService } from 'src/app/services/tables/vsl_vessel/vsl-vessel.service';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-vesselcreation',
  templateUrl: './vesselcreation.component.html',
  styleUrls: ['./vesselcreation.component.css']
})

export class VesselcreationComponent implements OnInit {


  public vesselNo: any;

  companyCode: string | null = null; // Initialize with null



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private vslVesselService: VslVesselService,
    private route: ActivatedRoute,
    private location: Location) {
    this.route.params.subscribe(params => {
      this.vesselNo = params['vesselNo'];


      // this.companyCode = params['selectedCompanyCode '];

    });
  }

  dropdownOptions: { key: string, value: string }[] = [
    { key: 'AFG', value: 'Afghanistan' },
    { key: 'AUS', value: 'Australia' },
    { key: 'BGD', value: 'Bangladesh' },
    { key: 'CHN', value: 'China' },
    { key: 'COL', value: 'Colombia' },
    { key: 'FIN', value: 'Finland' },
  ];


  //////////////////////////////
  registerForm!: FormGroup;
  submitted = false;
  editMode: boolean = false;
  updateData: any = {};

  updateData1: any = {};


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.companyCode = params['companyCode'] || null;
      // Now you can use this.companyCode in your component
    });
    this.initVesselForm();
    if (this.vesselNo) {
      this.editMode = true;
      this.getVesselDetails(this.vesselNo);

    } else {
      // Subscribe to value changes of the vesselNo input field
      this.registerForm.get('vesselNo')?.valueChanges.subscribe((vesselNo) => {
        // Check if the vesselNo is not empty
        if (vesselNo && !this.editMode) {
          // Validate vesselNo against existing records
          this.checkVesselNoAvailability(vesselNo);
        }
      });
    }
  }

  checkVesselNoAvailability(vesselNo: string) {
    if (this.companyCode) {
      // Call a service method to check if the vesselNo already exists
      this.vslVesselService.checkVesselNoAvailability(vesselNo, this.companyCode).subscribe(
        (response: boolean) => {
          if (response) {
            // Vessel No is already taken, set an error in the form
            this.registerForm.get('vesselNo')?.setErrors({ duplicateVesselNo: true });
          } else {
            // Vessel No is available, clear any previous errors
            this.registerForm.get('vesselNo')?.setErrors(null);
          }
        },
        (error: any) => {
          console.error('Failed to check vessel number availability:', error);
          // Handle the error as needed
        }
      );
    }
  }

  initVesselForm(): void {
    this.registerForm = this.formBuilder.group({
      // imoNumber: [null, [Validators.required, this.validateNumber]],
      vesselNo: ['', [Validators.required, Validators.pattern('[0-9]+')]],//
      vesselFlag: ['', Validators.required],//
      vesselName: ['', Validators.required],//
      ownerContactDetails: ['', Validators.required],
      operatorName: ['', Validators.required],
      operatorBuEmail: ['', Validators.required],
      ownershipStatus: ['', Validators.required],//
      dwt: ['', Validators.required],
      sisterVessels: ['', Validators.required],
      isInternalOnly: [false],
      vesselType: ['', Validators.required],//
      vesselClass: ['', Validators.required],//
      masterEmail: ['', Validators.compose([Validators.required, this.validateEmail])],//
      ownerCompany: ['', Validators.required],////
      operatorEmail: ['', Validators.required],
      pic: ['', Validators.required],
      marineShipType: ['', Validators.required],//
      isEeoiOnly: [false],
      isPerfVsl: [false],
      isNewVessel: [true],
      /////////////////////////////////////
      isTcRelet: [null],
      companyCode: [this.companyCode] || [null],
      createdBy: [null],
      createdTime: [null],
      fleetGroupCode: [null],
      fleetProfileCode: [null],
      isActive: [null],
      modifiedBy: [null],
      modifiedTime: [null],
      vmHtmlUrl: [null],

    });
  }

  getVesselDetails(vesselNo: string) {
    this.vslVesselService.findVesselByNo(vesselNo).subscribe(
      (response: any) => {
        console.log('Vessel details fetched successfully:', response);
        this.updateData = response;
        this.setEditValues(response);

      },
      (error) => {
        console.error('Failed to fetch vessel details:', error);
        // Handle the error as needed
      }
    );
  }




  protected get registerFormControl() {
    return this.registerForm.controls;
  }


  protected onSubmit(): void {

    if (this.editMode) {
      this.submitted = true;
      if (this.registerForm.valid) {



        this.vslVesselService.updateVessel(this.updateData.vesselNo, this.registerForm.value).subscribe(
          (response) => {
            console.log('Vessel updated successfully', response);
            // Handle success message or redirection if needed
          },
          (error) => {
            console.error('Failed to update vessel!', error);
            // Handle error message or show validation errors if needed
          }
        );
        //alert(' Details submitted');
        Swal.fire("Details updated successfully", "success");
        // this.router.navigateByUrl('vessel/vessel-list');


        //After editing, navigate back to the specific company code listing page
        this.router.navigate(['vessel/vessel-list'], { queryParams: { companyCode: this.updateData.companyCode } });


      }


    }
    else {
      this.submitted = true;

      if (this.registerForm.valid) {


        // Add companyCode to the form value
        this.registerForm.patchValue({ companyCode: this.companyCode });


        const updateData = this.registerForm.value;
        this.vslVesselService.createVessel(updateData).subscribe(
          (response) => {
            console.log('Data sent to backend successfully:', response);

          }

        )

        console.table(this.registerForm.value);
        Swal.fire("Details submitted successfully", "success");

        this.router.navigate(['vessel/vessel-list'], { queryParams: { companyCode: this.companyCode } });

      }
    }
  }


  ///////////////////////////////


  isFieldInvalid(fieldName: string): boolean {
    const field = this[fieldName as keyof VesselcreationComponent];
    return field === undefined || field === null || field === '';
  }

  private touchedFields: Set<string> = new Set<string>();

  isFieldTouched: { [key: string]: boolean } = {};
  setFieldTouched(fieldName: string) {
    this.isFieldTouched[fieldName] = true;
  }

  @ViewChild('vesselForm', { static: false }) vesselForm!: NgForm;


  validateFields() {
    this.isFieldTouched['vesselNo'] = true;
    this.isFieldTouched['vesselFlag'] = true;
    this.isFieldTouched['vesselName'] = true;
    this.isFieldTouched['ownershipStatus'] = true;
    this.isFieldTouched['vesselType'] = true;
    this.isFieldTouched['vesselClass'] = true;
    this.isFieldTouched['masterEmail'] = true;
    this.isFieldTouched['marineShipType'] = true;

  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  reDirect() {
    this.router.navigateByUrl('vessel/vessel-list')
  }

  get formControls() {
    return this.registerForm?.controls;

  }
  setEditValues(vesselData: any) {
    this.registerForm?.setValue({
      vesselNo: vesselData.vesselNo,
      vesselFlag: vesselData.vesselFlag,
      vesselName: vesselData.vesselName,
      ownerContactDetails: vesselData.ownerContactDetails,
      operatorName: vesselData.operatorName,
      operatorBuEmail: vesselData.operatorBuEmail,
      ownershipStatus: vesselData.ownershipStatus,
      dwt: vesselData.dwt,
      sisterVessels: vesselData.sisterVessels,
      isInternalOnly: vesselData.isInternalOnly ? true : false,

      vesselType: vesselData.vesselType,
      vesselClass: vesselData.vesselClass,
      masterEmail: vesselData.masterEmail,
      ownerCompany: vesselData.ownerCompany,

      operatorEmail: vesselData.operatorEmail,
      pic: vesselData.pic,
      marineShipType: vesselData.marineShipType,

      isEeoiOnly: vesselData.isEeoiOnly ? true : false,
      isPerfVsl: vesselData.isPerfVsl ? true : false,
      isNewVessel: vesselData.isNewVessel ? true : false,
      //////////////////////
      isTcRelet: vesselData.isTcRelet ? true : false,
      companyCode: vesselData.companyCode,
      createdBy: vesselData.createdBy,
      createdTime: vesselData.createdTime,
      fleetGroupCode: vesselData.fleetGroupCode,
      fleetProfileCode: vesselData.fleetProfileCode,
      isActive: vesselData.isActive ? true : false,
      modifiedBy: vesselData.modifiedBy,
      modifiedTime: vesselData.modifiedTime,
      vmHtmlUrl: vesselData.vmHtmlUrl

    })
  }
}




