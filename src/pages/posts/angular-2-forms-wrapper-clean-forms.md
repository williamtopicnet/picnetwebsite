---
title: "Angular 2 Forms Wrapper - Clean forms"
slug: "angular-2-forms-wrapper-clean-forms"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1463961600000"
date: "2016-05-23"
categories: 
  - "software-engineering"
---

[Angular 2 forms](https://angular.io/docs/ts/latest/guide/forms.html) are very powerful, the custom validation support is extremely flexible and easy to use. However, this power and flexibility comes at a cost; and that is boiler plate. To nicely integrate validations into the user interface you need a lot of ugly boilerplate template code. This makes the templates hard to maintain and very hard to keep consistent across a large application. So this simple wrapper tries to address that.

Note, this should not be treated as a complete open source project but rather a template you can work into your own application with your own customizations. The sample here uses html 5 input elements but you should insert your own generators for bootstrap, material or what ever control/css library you prefer.

**The Problem**

To get a nice interactive forms user interface you need a lot of code. For instance this a simple email field **without** good interactivity / validations looks like:

<pre>&lt;div class="form-group"&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input type="email" [(ngModel)]="email"&gt;
&lt;/div&gt;</pre>

This is nice, clean and simple. However, it lacks the validations required for a good quality production application. Let's add good interactivity and validation to this template. We will be using Angular 2 forms for this.

<pre>&lt;div class="form-group"&gt;
  &lt;label for="email" [ngClass]="{'ui-state-error': !form.find('email').valid &amp;&amp; (model.ID || !form.find('email').pristine), 'required': f.required}"&gt;
    &lt;span class="required"&gt;*&lt;/span&gt;Email
  &lt;/label&gt; 
  &lt;input  
    class="form-control" 
    type="email" 
    [(ngModel)]="email" 
    [ngFormControl]="form.find('email')"
    [ngClass]="{'ui-state-error': !form.find('email').valid &amp;&amp; (model.ID || !form.find('email').pristine)}"&gt;
&lt;/div&gt;</pre>

Personally I feel that this makes the template virtually unmantainable (just imagine a form with 10 or 20 fields). You could of course move some of the ngClass objects into the component itself but then you are just moving the mess around.

**Wrapper**

So lets add a layer of abstraction. Angular 2's great component model makes this fairly easy. Ofcourse with every abstraction you are losing flexibilty and introducing a critical piece of code that may turn into a maintenance bottleneck. However, I chose to do this because I found the Forms boiler plate just too messy. Basically this wrapper makes forms programatic rather than declarative, so a form definition now looks like this:

<pre>this.fieds = [
  {id: 'ID', name: 'Entity ID', type: 'number', disabled: true},
  {id: 'EntityName', name: 'Entity Name', type: 'text',
      required: true, autofocus: true},
  {id: 'Email', name: 'Email', type: 'email', required: true}
];</pre>

Which is not great, I mean we are losing a lot of flexibility here and that is why I say above that this is not a project in its own right, simply a template for you to start with as you have to ensure it meets your own purposes.

Some things to note:

- I am using a tabbed form to allow for bigger forms. If you ommit the tab: 'Name' attribute then tabs are not shown
- I am using \[PrimeNG\] (http://www.primefaces.org/primeng/) as my component library, can be replaced with anything.
- I am using hard coded custom elements; ie: type: 'custom1' ... type: 'custom5'. The reason for this ugly hack is this \[Angular 2 limitation\](https://github.com/angular/angular/issues/8563)
- If a form contains a custom element that eventually shows another form (such as a dialog that shows another form) you may run into issues. Recursive components cause problems in Angular 2 RC1.

**Code**

The edit-form Component code:

<pre>import {Input, Component, OnInit, CORE_DIRECTIVES, 
    InputText, Password, Button, InputTextarea, Calendar, 
    Dropdown, Checkbox, Dialog, MultiSelect, TabView, TabPanel, 
    Autofocus, Helpers} from '../common';
import {Control} from '@angular/common';
import {ControlGroup, FormBuilder, Validators} from '@angular/common';
import {ColorPickerDirective} from '../lib/color-picker/color-picker.directive';
<div></div>
@Component({
  selector: 'edit-form',
  templateUrl: 'app/misc/edit-form.html',
  styleUrls: ['app/misc/edit-form.css'],
  directives: [CORE_DIRECTIVES, InputText, Password, Button, InputTextarea, 
    Calendar, Dropdown, MultiSelect, Checkbox, Dialog, TabView, TabPanel,
    Autofocus, ColorPickerDirective]
})  
export class EditFormComponent implements OnInit {
  @Input() public fields: IField[];
  @Input() public class: string;
  @Input() public model: any;
  @Input() public formValidator: any;
  public tabs: string[] = [];
  public form: ControlGroup;
<div></div>
  constructor(private fb: FormBuilder) {}
<div></div>
  ngOnInit() {  
    if (!this.fields || !this.fields.length) {
      throw new Error('no fields specified for this edit-form');
    }
<div></div>
    const group = {};
    const hastabs = !!Helpers.find(this.fields, (f: IField) =&gt; f.tab);
    let lasttab = this.fields[0].tab;
    if (hastabs &amp;&amp; !lasttab) { 
      throw new Error('If tabs are specified then the first field must have a tab'); 
    }
    this.fields.forEach((f: IField) =&gt; {
      const fieldopts: any[] = [this.defaultval(f) || ''];
      let validators: any[] = [];      
      if (hastabs) {
        if (!f.tab) { f.tab = lasttab; }
        lasttab = f.tab;
        if (this.tabs.indexOf(f.tab) &lt; 0) { this.tabs.push(f.tab); } } else { this.tabs = ['']; } if (f.required) { validators.push((c: Control) =&gt; 
          this.visible(f) ? Validators.required(c) : null); }
      if (f.validators) { validators = validators.concat(f.validators); }
      if (validators.length === 1) { fieldopts.push(validators[0]); }
      if (validators.length &gt; 1) { fieldopts.push(Validators.compose(validators)); }
      group[f.id] = fieldopts;
    });
    this.form = this.fb.group(group, {validator: (g: ControlGroup) =&gt; {              
        return this.formValidator ? this.formValidator(g) : null;
      }
    });    
  }
<div></div>
  visiblefields(tab: string): IField[] {
    return this.fields.filter((f: IField) =&gt; (!f.tab || f.tab === tab) &amp;&amp; this.visible(f));
  }
<div></div>
  classes(f: IField): any {
    return { 'form-heading': f.type === 'heading', 'form-group': f.type !== 'heading' };
  }
<div></div>
  options(f: IField) {    
    if (typeof(f.options) === 'function') { return f.options(); }
    if (typeof(f.options.length) === 'number') { return f.options; }    
    return Object.keys(f.options).map(k =&gt; { return { value: f.options[k], label: f.options[k] }; });
  }
<div></div>
  onchange(f: IField) {
    if (f.onchange) { f.onchange(); }
  }
<div></div>
  defaultval(f: IField) {    
    if (typeof(f.default) === 'function') { return f.default(); }
    return f.default;
  }
<div></div>
  visible(f: IField) {    
    if (typeof(f.visible) === 'undefined') { return true; }
    if (typeof(f.visible) === 'boolean') { return f.visible; }
    return f.visible();
  }
<div></div>
  geterror(f?: IField): string {
    const errors = f ? this.form.find(f.id).errors : this.form.errors;
    if (!errors) { 
      if (!f) { 
        const controls = this.form.controls;
        const ids = Object.keys(controls).filter(id =&gt; !controls[id].valid);
        let message = '';
        ids.forEach(id =&gt; {
          const field = Helpers.find(this.fields, (f2: IField) =&gt; f2.id === id);
          const err = (field.name || field.id) + ': ' + this.geterror(field);
          message += err + '
';
        });
        return message;
      }
      return 'Please correct the form errors.'; 
    }    
    let message = '';
    Object.keys(errors).forEach(e =&gt; {
      if (!errors[e]) { return; }
      if (message) { message += '
'; }      
      let msg = errors[e];
      if (msg === true) {
        if (e === 'required') { msg = 'Field is required.'; }
        else { msg = e; }
      }
      message += msg;
    });
    return message;
  }  
}
<div></div>
export interface IField {  
  // generic
  id: string;
  type: string;
<div></div>
  hideLabel?: boolean;
  tab?: string;
  autofocus?: boolean;
  visible?: any;
  name?: string;
  disabled?: boolean;  
  default?: any;
  required?: boolean;
  validators?: Function[];
<div></div>
  // p-dropdown options  
  filter?: boolean;
  options?: any;
  onchange?: Function;
}
</pre>

The edit-form template code:

<pre>&lt;div *ngIf="fields &amp;&amp; model"&gt;
  &lt;form [ngFormModel]="form" [class]="class"&gt;
    &lt;div *ngIf="!form.valid &amp;&amp; (model.ID || !form.pristine)" 
        class="ui-message-error" 
        [innerHTML]="geterror()"&gt;
    &lt;/div&gt;    
    &lt;div [ngClass]="{'hide-tabs': tabs.length &lt;= 1}" class="ui-grid"&gt;
      &lt;p-tabView&gt;
        &lt;p-tabPanel *ngFor="let t of tabs" [header]="t"&gt;
          &lt;div *ngFor="let f of visiblefields(t)" [ngClass]="classes(f)"  class="ui-grid-row"&gt;      
            &lt;div *ngIf="!f.hideLabel" class="ui-grid-col-3"&gt;
              &lt;label *ngIf="f.name || f.id"
                  [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine), 'required': f.required}"&gt;
                &lt;span *ngIf="f.required"&gt;*&lt;/span&gt;
                {{f.name || f.id}}
              &lt;/label&gt;
            &lt;/div&gt;
            &lt;div [ngSwitch]="f.type" [ngClass]="{'ui-grid-col-9': !f.hideLabel, 'ui-grid-col-12': f.hideLabel}"&gt;
              &lt;span *ngSwitchWhen="'custom1'"&gt;&lt;ng-content select="custom1"&gt;&lt;/ng-content&gt;&lt;/span&gt;
              &lt;span *ngSwitchWhen="'custom2'"&gt;&lt;ng-content select="custom2"&gt;&lt;/ng-content&gt;&lt;/span&gt;
              &lt;span *ngSwitchWhen="'custom3'"&gt;&lt;ng-content select="custom3"&gt;&lt;/ng-content&gt;&lt;/span&gt;
              &lt;span *ngSwitchWhen="'custom4'"&gt;&lt;ng-content select="custom4"&gt;&lt;/ng-content&gt;&lt;/span&gt;
              &lt;span *ngSwitchWhen="'custom5'"&gt;&lt;ng-content select="custom5"&gt;&lt;/ng-content&gt;&lt;/span&gt;
              &lt;span *ngSwitchWhen="'heading'"&gt;            
                &lt;h3 class="edit-form-heading"&gt;{{defaultval(f)}}&lt;/h3&gt;
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'multi'"&gt;          
                &lt;p-multiSelect 
                    defaultLabel="Select..."
                    [options]="options(f)" 
                    [disabled]="f.disabled"
                    [(ngModel)]="model[f.id]"
                    (onChange)="onchange(f)"  
                    [ngFormControl]="form.find(f.id)"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;/p-multiSelect&gt;
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'dropdown'"&gt;          
                &lt;p-dropdown *ngIf="options(f).length"
                    [filter]="f.filter"
                    [options]="options(f)" 
                    [disabled]="f.disabled"
                    [(ngModel)]="model[f.id]"
                    (onChange)="onchange(f)"  
                    [ngFormControl]="form.find(f.id)"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;/p-dropdown&gt;
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'new-password'"&gt;
                &lt;input class="form-control" 
                    pPassword 
                    type="text" 
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'colour'"&gt;
                &lt;input pInputText [(colorPicker)]="model.CommercialStatusColour"
                    [style.background]="model[f.id]" 
                    [cpHeight]="'240px'" 
                    [value]="model[f.id]"
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'date'"&gt;
                &lt;p-calendar 
                    dateFormat="yy-mm-dd" 
                    class="form-control"
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;/p-calendar&gt; 
              &lt;/span&gt;
              &lt;span *ngSwitchWhen="'textarea'"&gt;
                &lt;textarea 
                    pInputTextarea 
                    class="form-control" 
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;/textarea&gt;
              &lt;/span&gt;        
              &lt;span *ngSwitchWhen="'boolean'"&gt;
                &lt;p-checkbox 
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;/p-checkbox&gt;
              &lt;/span&gt;              
              &lt;span *ngSwitchDefault&gt;                   
                &lt;input *ngIf="f.autofocus" 
                    autofocus
                    class="form-control"               
                    pInputText 
                    [type]="f.type" 
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
                &lt;input *ngIf="!f.autofocus" 
                    class="form-control"               
                    pInputText 
                    [type]="f.type" 
                    [(ngModel)]="model[f.id]" 
                    [ngFormControl]="form.find(f.id)"
                    [disabled]="f.disabled"
                    [ngClass]="{'ui-state-error': !form.find(f.id).valid &amp;&amp; (model.ID || !form.find(f.id).pristine)}"&gt;
              &lt;/span&gt;
              &lt;div [hidden]="form.find(f.id).valid || form.find(f.id).pristine" class="ui-message-error"&gt;
                {{ geterror(f) }}
              &lt;/div&gt;      
            &lt;/div&gt;
          &lt;/div&gt;    
        &lt;/p-tabPanel&gt;
      &lt;/p-tabView&gt;
    &lt;/div&gt;    
  &lt;/form&gt;
&lt;/div&gt;
</pre>

**Usage**

To use the forms wrapper above just do the following; template:

<pre> &lt;edit-form [fields]="fields" [model]="model" #form&gt;
 &lt;/edit-form&gt;</pre>
 
 Component:
 
 <pre>import {Component,OnInit,CORE_DIRECTIVES,EditFormComponent} 
  from '../common';
<div></div>
@Component({
 templateUrl: 'app/user-edit.html',
 styleUrls: ['app/user-edit.css'],
 directives: [CORE_DIRECTIVES, EditFormComponent],
 selector: 'user-edit'
})
export class UserEditComponent implements OnInit {
  constructor(data: DataService) {
    this.fields = [
      {id: 'UserName', name: 'Username', type: 'text', required: true, autofocus: true},
      {id: 'Email', type: 'email', required: true},
      {id: 'Company', type: 'text', required: true},
      {id: 'Password', type: 'new-password', required: this.isadd() },
      {id: 'Claims', name: 'Role', type: 'dropdown', required: true, options: this.claims},
      {id: 'IsActive', name: 'Is Active', type: 'boolean'},
      {id: 'NumLogins', name: 'Number of Logins', type: 'number', disabled: true}
    ];
  }
<div></div>
  ngOnInit() {
    this.data.getUser().subscribe((user: any) =&gt; this.model = user);
  }
}</pre>

**Custom Elements**

If you ever need a custom element simply do the following; template:

<pre>&lt;edit-form [fields]="fields" [model]="model" #form&gt;
  &lt;custom1&gt;
     This can be anything, however careful if you are loading 
        another edit-form in one of the children here.
  &lt;/custom1&gt;
  &lt;custom2&gt;
    Another custom element, look a button: &lt;button&gt;Wow&lt;/button&gt;
  &lt;/custom2&gt;
&lt;/edit-form&gt;</pre>

Component:

<pre>this.fields = [
   ...
   // Will "transclude" custom1 contents
   {id: 'HardToMakeGenericField', name: 'Custom Field', type: 'custom1'},
   // Will "transclude" custom2 contents
   {id: 'HardToMakeGenericField2', name: 'Custom Field 2', type: 'custom2'},
];</pre>

**Conclusion**

I am not a big fan of abstracting frameworks with custom code. This code usually ends up being the main maintenance bottleneck in complex systems. However, sometimes complexity in the framwork means that an abstraction is called for. I leave it to you to decide whether this is the case with Angular 2 forms and if you chose to use a form builder like the one in this post, I hope this helps you achieve that goal.
