import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer
  ) {}

  public registerSvg() {
    this.iconRegistry
      .addSvgIcon(
        'icon-email',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/icons/mail-icon.svg'
        )
      )
      .addSvgIcon(
        'icon-password',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/icons/password-icon.svg'
        )
      )
      .addSvgIcon(
        'icon-user',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/user.svg')
      )
      .addSvgIcon(
        'icon-phone',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/icons/phone-icon.svg'
        )
      )
      .addSvgIcon(
        'icon-info',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icons-info.svg')
      )
      .addSvgIcon(
        'icon-good-job',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/good-Job.svg')
      )

  }
}
