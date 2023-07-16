import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { KonnektorService } from './konnektor.service';
import { TopbarComponent } from './topbar/topbar.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KonnektorDetailsComponent } from './dashboard/konnektor-details/konnektor-details.component';
import { RecentLoginsComponent } from './recent-logins/recent-logins.component';

const appRoutes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    MainComponent,
    DashboardComponent,
    KonnektorDetailsComponent,
    RecentLoginsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [KonnektorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
