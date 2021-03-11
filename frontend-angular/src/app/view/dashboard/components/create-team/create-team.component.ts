import { TeamsService } from './../../../../core/services/teams.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor(
    private teamsService: TeamsService,
    private formBuilder: FormBuilder
  ) { }

  team!: FormGroup;

  ngOnInit(): void {
    this.team = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      rent: [0, [Validators.required, Validators.min(150)]],
      accountId: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]],
      description: ['', [Validators.required]],
      cashPolitic: ['', [Validators.required]],
      devolutionPolitic: ['', [Validators.required]]
    });
  }

  get control(){
    return this.team.controls;
  }

  register() {
    console.log(this.team.value)
  }

}
