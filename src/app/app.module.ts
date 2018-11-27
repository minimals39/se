import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule,MatCheckboxModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { UserpageComponent } from './userpage/userpage.component';
import { DataService } from './data.service';
import { CreateactComponent } from './createact/createact.component';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { EventpageComponent } from './eventpage/eventpage.component';
import { GrouppageComponent } from './grouppage/grouppage.component';
import { MenuComponent } from './menu/menu.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
    UserpageComponent,
    CreateactComponent,
    EventpageComponent,
    GrouppageComponent,
    MenuComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAntspVH3_QQJpWK1Y2Xe0uQ2_jKpkL9g'
    }),
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,

  ],

  providers: [ DataService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
