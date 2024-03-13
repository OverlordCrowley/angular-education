import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {IUser, IUserState} from "../../store/state/user.state";
import {Observable} from "rxjs";
import {isUserDataAvailable, selectCurrentUser, selectPages} from "../../store/selectors/user.selector";
import {GetUsers, UpdateProfilePhoto} from "../../store/actions/user.actions";
import {PaginationComponent} from "../pagination/pagination.component";
import {UserService} from "../../services/user.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  name: string;
  email: string;
  isLoaded: boolean;
   photo: File | undefined;
  setPhoto: any;
  password: string;
  hobbies: string;
  lastName: string;
  phone: string;
  currentPage: Observable<number> = new Observable<number>();
  totalPages: Observable<number> = new Observable<number>();
  user$: Observable<IUser> = new Observable<IUser>();
  allUsers: Observable<any> = new Observable<IUser[]>();
  nameMini: string;
  emailMini: string;
  photoMini: File | undefined;
  setPhotoMini: any;
  passwordMini: string;
  hobbiesMini: string;
  lastNameMini: string;
  phoneMini: string;
  constructor(private userService : UserService, private cdr: ChangeDetectorRef, private store: Store<{ user: IUserState }>) {

    this.name = '';
    this.email = '';
    this.isLoaded = false;
    this.photo = undefined;
    this.setPhoto = '';
    this.password = '';
    this.hobbies = '';
    this.lastName = '';
    this.phone = '';

    this.nameMini = '';
    this.emailMini = '';
    this.photoMini = undefined;
    this.setPhotoMini = '';
    this.passwordMini = '';
    this.hobbiesMini= '';
    this.lastNameMini = '';
    this.phoneMini = '';

    // this.store.select(selectPages).subscribe((pages: any) => {
    //   this.totalPages = pages.totalPages;
    // });
    //
    // this.store.select(selectPages).subscribe((pages: any) => {
    //   this.currentPage = pages.currentPage;
    // });


    this.isLoaded = false;

  }


  getAllUsers(page: number): void {
    this.userService.getAllUsers(page).subscribe(
      (data) => {
        // this.allUsers = data.users;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.lastNameMini = data.users[0].lastName;
        this.nameMini = data.users[0].firstName;
        this.emailMini = data.users[0].email;
        this.photoMini = undefined;
        this.setPhotoMini = '';
        this.passwordMini = data.users[0].pass;
        this.hobbiesMini = data.users[0].hobbies;
        this.lastNameMini = data.users[0].firstName;
        this.phoneMini = data.users[0].phone;
        try {
          this.setPhotoMini = this.getUserPhotoUrl(data.users[0].image);
        } catch (e) {
          this.setPhotoMini = this.getUserPhotoUrl(null);
        }

      },
      (error) => {
        console.error('Ошибка при получении пользователей:', error);
      }
    );
  }
  onPageChange($event: any){
    this.currentPage = $event
    this.getAllUsers(Number(this.currentPage))
  }

  ngOnInit() {
    this.getAllUsers(1);

    this.store.select(selectCurrentUser).subscribe((userData: any) => {

      if (userData !== null) {
        let user = userData.user;
        this.name = user.firstName;
        this.email = user.email;
        this.isLoaded = false;
        this.photo = undefined;
        this.setPhoto = '';
        this.password = user.pass;
        this.hobbies = user.hobbies;
        this.lastName = user.firstName;
        this.phone = user.phone;
        try {
          this.setPhoto = this.getUserPhotoUrl(user.image);
        } catch (e) {
          this.setPhoto = this.getUserPhotoUrl(null);
        }
      } else {
        let localUser = localStorage.getItem('user')
        let user: any = JSON.parse(String(localUser))
        this.name = user.user.firstName;
        this.email = user.user.email;
        this.isLoaded = false;
        this.photo = undefined;
        this.setPhoto = '';
        this.password = user.user.pass;
        this.hobbies = user.user.hobbies;
        this.lastName = user.user.firstName;
        this.phone = user.user.phone;
        try {
          this.setPhoto = this.getUserPhotoUrl(user.user.image);
        } catch (e) {
          this.setPhoto = this.getUserPhotoUrl(null);
        }
      }
    });


  };


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.photo = file;
    }
  }

   getUserPhotoUrl(image: string | null) {
    if(image !== null && image.includes("static")){
      return `http://localhost:8080${image}`;
    }
    return '/assets/images/Sample_User_Icon.png';

  }
  async uploadProfilePhoto(file: File) {
    try {
      this.store.dispatch(UpdateProfilePhoto({"email": this.email, "file": file}))


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
