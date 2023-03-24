import { createRouter , createWebHistory } from "vue-router";
import TableList from "../components/TableList.vue"
import CreateStudent from "../components/CreateStudent.vue";
import Info from "../components/Info.vue";
import FixStudent from "../components/FixStudent.vue";
const routes = [
    {path : '/create' , component : CreateStudent},
    {path : '/edit/:code' , component : FixStudent},
    {path : '/info' , component : Info},
    {path:'/' , component : TableList},

]

const router = createRouter({
    history :createWebHistory(),
    routes
})

export default router;