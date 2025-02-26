import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { AwardComponent } from './pages/award/award/award.component';
import { CreateAwardComponent } from './pages/award/create-award/create-award.component';
import { BlogComponent } from './pages/blog/blog/blog.component';
import { CreateBlogComponent } from './pages/blog/create-blog/create-blog.component';
import { CategoryComponent } from './pages/category/category/category.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { ArticleComponent } from './pages/article/article/article.component';
import { CreateArticleComponent } from './pages/article/create-article/create-article.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { ExpertComponent } from './pages/expert/expert/expert.component';
import { CreateExpertComponent } from './pages/expert/create-expert/create-expert.component';
import { FaqComponent } from './pages/faq/faq/faq.component';
import { CreateFaqComponent } from './pages/faq/create-faq/create-faq.component';
import { ProjectComponent } from './pages/project/project/project.component';
import { CreateProjectComponent } from './pages/project/create-project/create-project.component';
import { ServiceComponent } from './pages/service/service/service.component';
import { CreateServiceComponent } from './pages/service/create-service/create-service.component';
import { TestimonialComponent } from './pages/testimonial/testimonial/testimonial.component';
import { CreateTestimonialComponent } from './pages/testimonial/create-testimonial/create-testimonial.component';
import { AuthGuard } from './guards/auth.gaurd';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { EditProjectComponent } from './pages/project/edit-project/edit-project.component';
import { EditAwardComponent } from './pages/award/edit-award/edit-award.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', title: 'Login', component: LoginComponent},
    {path: 'register', title: 'Register', component: RegisterComponent},
    {path: 'forget-password', title: 'Forget-password', component: ForgetPasswordComponent},
    {path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'edit-profile',
                component: EditProfileComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'blog',
                component: BlogComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'create-blog',
                component: CreateBlogComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'category',
                component: CategoryComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'create-category',
                component: CreateCategoryComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'article',
                component: ArticleComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'create-article',
                component: CreateArticleComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'consultation',
                component: ConsultationComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'expert',
                component: ExpertComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'create-expert',
                component: CreateExpertComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'award',
            component: AwardComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'create-award',
            component: CreateAwardComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'edit-award/:id',
            component: EditAwardComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'faq',
            component: FaqComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'createfaq',
            component: CreateFaqComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'project',
                component: ProjectComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'create-project',
                component: CreateProjectComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'edit-project/:id',
                component: EditProjectComponent,
                canActivate: [AuthGuard]
        },
        {
            path: 'service',
            component: ServiceComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'create-service',
            component: CreateServiceComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'testimonial',
            component: TestimonialComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'create-testimonial',
            component: CreateTestimonialComponent,
            canActivate: [AuthGuard]
        }
    ]
    },
    {path: '**', component: LoginComponent}
];
