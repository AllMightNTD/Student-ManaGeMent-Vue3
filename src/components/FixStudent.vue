<template>
  <div className="flex items-center justify-center mt-10">
    <form
      @submit.prevent="onSubmit"
      className="w-3/5 border px-6 py-5 rounded-md shadow-sm shadow-gray-300"
    >
      <div className="flex items-center w-full">
        <label htmlFor="" className="flex-1 mt-2"> Code </label>
        <input
          placeholder="Code..."
          className="px-2 py-2 rounded-lg  outline-blue-500/50 w-10/12 border"
          name="code"
          v-model="data.code"
          type="text"
        />
      </div>
      <div className="flex items-center w-full my-7">
        <label htmlFor="" className="flex-1"> Name </label>
        <input
          placeholder="Name"
          name="name"
          className="px-2 py-2 rounded-lg  outline-blue-500/50 w-10/12 border"
          type="text"
          v-model="data.name"
        />
      </div>
      <div className="flex items-center w-full my-7">
        <label htmlFor="" className="w-2/12"> Date </label>
        <input
          placeholder="Date..."
          name="date"
          v-model="data.date"
          className="px-2 py-2 rounded-lg  outline-blue-500/50 w-4/12 border"
          type="date"
        />
      </div>
      <div className="flex items-center w-full my-7">
        <label htmlFor="" className="w-2/12"> Gender </label>
        <div className="flex gap-2 w-4/12">
          <input
            onChange="{AddDataNew}"
            type="radio"
            name="gender"
            value="Nam"
            v-model="data.gender"
          />
          Nam
          <input
            onChange="{AddDataNew}"
            type="radio"
            name="gender"
            value="Nữ"
            v-model="data.gender"
          />
          Nữ
        </div>
      </div>
      <div className="flex items-center w-full my-7">
        <label htmlFor="" className="flex-1"> Name Department </label>
        <input
          placeholder="Name Department..."
          name="nameDepartment"
          className="px-2 py-2 rounded-lg  outline-blue-500/50 w-10/12 border"
          type="text"
          v-model="data.NameDepartment"
        />
      </div>
      <div className="flex items-center w-full my-7">
        <label htmlFor="" className="flex-1"> Code Department </label>
        <input
          name="codeDepartment"
          placeholder="Code Department..."
          v-model="data.CodeDepartment"
          className="px-2 py-2 rounded-lg  outline-blue-500/50 w-10/12 border"
          type="text"
        />
      </div>
      <div className="">
        <Link
          to="/"
          className="float-left underline text-gray-500 decoration-solid"
        >
          Return to Home
        </Link>
        <button
          className="float-right px-2 py-2 border-none outline-none rounded-xl  bg-orange-500 text-white border-cyan-300"
          type="submit"
        >
          Update Students
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  name: "FixStudent",
  data() {
    return {
      data: {
        code: "",
        name: "",
        date: "",
        gender: "",
        NameDepartment: "",
        CodeDepartment: "",
      },
    };
  },
  mounted() {
    const liststudent = localStorage.getItem("dataOld")
      ? JSON.parse(localStorage.getItem("dataOld"))
      : [];
    const dataFix = liststudent.find(
      (item) => item.code === this.$route.params.code
    );
    console.log(dataFix);
    this.data.code = dataFix.code;
    this.data.name = dataFix.name;
    this.data.date = dataFix.date;
    this.data.gender = dataFix.gender;
    this.data.NameDepartment = dataFix.NameDepartment;
    this.data.CodeDepartment = dataFix.CodeDepartment;
  },
  methods: {
    onSubmit() {
      const liststudent = localStorage.getItem("dataOld")
        ? JSON.parse(localStorage.getItem("dataOld"))
        : [];
      const indexFix = liststudent.findIndex((item) => item.code === this.$route.params.code);
      if (indexFix != -1) {
        liststudent[indexFix] = this.data;
        localStorage.setItem("dataOld", JSON.stringify(liststudent));
        toast.success("Sửa Thành Công", {
          autoClose: 1000,
          onClose: () => {
            window.location.href = "/";
          },
        });
      }
      else{
        toast.error("Sửa Thất Bại", {
          autoClose: 1000,
        });
      }
    },
  },
};
</script>

<style></style>
