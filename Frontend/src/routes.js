import CreateEditBlog from "./pages/MyBlogs/CreateEditBlog";

export const Routes = {
    // pages
    Signin: { path: "/" },
    DashboardOverview: { path: "/dashboard/overview" },
    Notifications: { path: "/Notfications" },
    Settings: { path: "/settings" },
    Profile: { path: "/Profile" },
    Blogs: { path: "/Blogs" },
    BlogsDetails:{path:'/BlogsDetails/:id'},
    Friends: { path: "/Friends" },
    MyBlogs: { path: "/MyBlogs" },
    CreateEditBlog: { path: "/CreateEditBlog" },
    EditBlog: { path: "/EditBlog/:id" },

    Messages: { path: "/Messages" },
    Billing: { path: "/billing" },


    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "forgot-password" },
    ResetPassword: { path: "reset-password" },
    Lock: { path: "/lock" },
    NotFound: { path: "/404" },
    ServerError: { path: "/500" },

 

};