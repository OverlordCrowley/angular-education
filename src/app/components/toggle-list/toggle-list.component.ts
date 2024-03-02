import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-toggle-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './toggle-list.component.html',
  styleUrl: './toggle-list.component.scss'
})
export class ToggleListComponent implements OnInit {
  @Output() inputListChanged = new EventEmitter<string[]>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      inputs: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });

    this.form.valueChanges.subscribe(() => {
      this.emitInputList();
    });
  }

  get inputs() {
    return this.form.get('inputs') as FormArray;
  }

  addInput() {
    this.inputs.push(this.fb.control('', Validators.required));
  }

  removeInput(index: number) {
    this.inputs.removeAt(index);
    this.emitInputList();
  }


  emitInputList() {
    this.inputListChanged.emit(this.inputs.value);
  }
}
