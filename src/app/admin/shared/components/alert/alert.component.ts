import { Component, Input } from '@angular/core';
import { Alert, AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() duration = 5000;

  public text: string = '';
  public type = 'success';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alert$.subscribe((alert: Alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.duration);
    });
  }
}
