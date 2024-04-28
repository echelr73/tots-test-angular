import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DatepickerFieldComponent } from '../../../../tots_form/date-field-form/src/lib/fields/datepicker-field/datepicker-field.component';
import { TotsActionForm } from '../../../../tots_form/form/src/lib/entities/tots-action-form';
import { TotsModalConfig } from '../../../../tots_form/form/src/lib/entities/tots-modal-config';
import { SubmitButtonFieldComponent } from '../../../../tots_form/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { AutocompleteFieldComponent, AutocompleteListFieldComponent, AutocompleteObsFieldComponent, AvatarPhotoFieldComponent, ButtonToggleFieldComponent, FilesListFieldComponent, IntegerFieldComponent, OneFileFieldComponent, PhotosFieldComponent, RadioGroupFieldComponent, RowFieldComponent, SelectFieldComponent, SelectObsFieldComponent, StringFieldComponent, TextareaFieldComponent, TotsFieldForm, TotsFormComponent, TotsFormModalService } from '../../../../tots_form/form/src/public-api';
import { TotsUsersSelectorMenuConfig } from '../../../../tots_form/users-selector-menu/src/lib/entities/tots-users-selector-menu-config';
import { delay, map, Observable, of, tap } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import * as moment from 'moment';
import { DatepickerAndTimeEndFieldComponent, RangeDatepickerFieldComponent } from '../../../../tots_form/date-field-form/src/public-api';
import { TotsFormApiService, TotsFormModalApiConfig } from '../../../../tots_form/form-api/src/public-api';
import { HtmlFieldComponent } from '../../../../tots_form/html-field-form/src/public-api';
import { MentionHtmlFieldComponent } from '../../../../tots_form/quill-mention-field-form/src/public-api';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss'
})
export class FormComponentComponent {

}
