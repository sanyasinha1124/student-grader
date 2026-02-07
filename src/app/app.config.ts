import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};


// Why use Routing instead of *ngIf?
// Browser History: Users can use the "Back" and "Forward" buttons in their browser.

// Direct Links: You can send someone a link directly to the /enroll page.

// Organization: It keeps your AppComponent clean—it only handles the layout (navbar/footer), while the specific logic stays in the separate components.