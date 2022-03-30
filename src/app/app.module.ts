import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { JoinUsPageComponent } from './pages/join-us-page/join-us-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { ButtonComponent } from './components/button/button.component';
import { SwiperModule} from 'swiper/angular'
import { ModalModule } from './components/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DonateModalComponent } from './components/donate-modal/donate-modal.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: HomePageComponent },
  { path: 'join-us', component: HomePageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'contacts', component: HomePageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutPageComponent,
    JoinUsPageComponent,
    NewsPageComponent,
    ContactsPageComponent,
    HomePageComponent,
    ButtonComponent,
    DonateModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SwiperModule,
    ModalModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
