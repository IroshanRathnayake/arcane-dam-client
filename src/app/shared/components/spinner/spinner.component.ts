import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit{
    @Input() isLoading: boolean = false

    message: string = 'Loading...';

    ngOnInit(): void {
        if(sessionStorage.getItem('oneTimeData') == 'false'){
          this.message = 'Getting things ready for you...';
          this.isLoading = true;
        }else{
          this.message = 'Loading...';
        }
    }


}
