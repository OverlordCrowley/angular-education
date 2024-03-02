import {ChangeDetectorRef, Component} from '@angular/core';
import {getUser, singIn, updateProfilePhoto} from "../https/user";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name: string;
  email: string;
  isLoaded: boolean;
  photo: File | undefined;
  setPhoto: any;
  password: string;

  constructor(private cdr: ChangeDetectorRef) {
    let user = getUser();
    this.name = user.firstName ? user.firstName : user.user.firstName;
    this.email = user.email ? user.email : user.user.email;
    this.isLoaded = false;
    this.password = user.pass ? user.pass : user.user.pass;
    try{
      this.setPhoto = this.getUserPhotoUrl(user.user.image)
    }
    catch (e) {
      this.setPhoto = this.getUserPhotoUrl(user.image)
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.photo = file;
    }
  }

   getUserPhotoUrl(image: string) {
    if(image !== null && image.includes("static")){
      return `http://localhost:8080${image}`;
    }
    return '/assets/images/Sample_User_Icon.png';

  }
  async uploadProfilePhoto(file: File) {
    try {
      const response = await updateProfilePhoto(this.email, file);
      let usr = await singIn(this.email, this.password).then((r: any) => {
        localStorage.setItem('user', JSON.stringify(r.data));
        this.setPhoto = this.getUserPhotoUrl(r.data.user.image);
        this.cdr.detectChanges();
      });



      console.log('Фото обновлено:', response.data);
    } catch (error) {
      console.error('Ошибка обновления фото:', error);
    }
  }




  sendPhoto(){
    if(this.photo !== undefined){
      this.uploadProfilePhoto(this.photo);
    }

  }

}
