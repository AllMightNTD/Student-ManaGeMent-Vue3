<template>
  <div class="mt-8 px-5">
    <div class="flex">
      <div class="flex-1 flex gap-10">
      <div>
        <input type="checkbox" v-model="selectAllChecked" @click="toggleSelectAll">
    <label>Chọn tất cả</label>
  
      </div>
    <button
        className="w-[100px] h-[30px] flex items-center justify-center bg-red-400 text-white font-bold rounded-xl"
        @click="handleDeleteAll"
        >
      Xóa
      </button>
    </div>
      <div
      className="block border w-5/6 flex shadow-sm mb-5 border-slate-300 overflow-hidden rounded-xl"
    >
      <input
        type="text"
        v-model="valueSearch"
        name="search"
        className="px-3 outline-none bg-white lock w-full rounded-md sm:text-sm"
        placeholder="Input your text search"
      />
      <button
        @click="HandleSearch"
        className="px-2 py-2 w-[100px] flex items-center justify-center bg-cyan-400 text-white font-bold rounded-xl"
      >
        Tìm Kiếm
      </button>
     
    </div>
   
    </div>
    
    <table class="border-collapse w-full border border-slate-500 ...">
      <thead>
        <tr>
          <th class="border border-slate-600">Check</th>
          <th class="border border-slate-600">Code</th>
          <th class="border border-slate-600">Name</th>
          <th class="border border-slate-600">Date</th>
          <th class="border border-slate-600">Gender</th>
          <th class="border border-slate-600">Name DePartment</th>
          <th class="border border-slate-600">CodeDP</th>
          <th class="border border-slate-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in datas" :key="index">
          <td class="border border-slate-700 ...">
            <input
              ref="checkboxes"
              type="checkbox"
              :name="'checkbox-' + index"
              v-model="data.checked"
              @click="toggleCheckbox(index)"
            />
          </td>
          <td class="border border-slate-700 ...">{{ data.code }}</td>
          <td class="border border-slate-700 ...">{{ data.name }}</td>
          <td class="border border-slate-700 ...">{{ data.date }}</td>
          <td class="border border-slate-700 ...">{{ data.gender }}</td>
          <td class="border border-slate-700 ...">{{ data.NameDepartment }}</td>
          <td class="border border-slate-700 ...">{{ data.CodeDepartment }}</td>
          <td class="border border-slate-700 ...">
            <button
              class="ml-3 bg-rose-600 text-white px-2 rounded-md"
              @click="deleteData(data.code)"
            >
              Xóa
            </button>
            <router-link
              :to="`/edit/${data.code}`"
              class="ml-3 bg-emerald-400 text-white px-2 rounded-md"
              >Sửa</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref , computed } from "vue";
export default {
  data() {
    return {
      valueSearch: "",
      datas: localStorage.getItem("dataOld")
        ? JSON.parse(localStorage.getItem("dataOld"))
        : [],
      selectAllChecked: false,
    };
  },
  methods: {
    // Xóa dữ liệu
    deleteData(code) {
      console.log(code);
      const listStudent = localStorage.getItem("dataOld")
        ? JSON.parse(localStorage.getItem("dataOld"))
        : [];
      const findIndex = listStudent.findIndex((item) => item.code === code);
      if (findIndex != -1) {
        listStudent.splice(findIndex, 1);
        localStorage.setItem("dataOld", JSON.stringify(listStudent));
        this.$forceUpdate();
        this.datas = listStudent;
        this.$forceUpdate();
      } else {
        return;
      }
    },

    // Tìm Kiếm
    HandleSearch() {
      console.log(this.valueSearch);
      const dataSearch = this.datas.filter(
        (item) =>
          item.code
            .toLowerCase()
            .includes(this.valueSearch.trim().toLowerCase()) ||
          item.name
            .toLowerCase()
            .includes(this.valueSearch.trim().toLowerCase()) ||
          item.date
            .toLowerCase()
            .includes(this.valueSearch.trim().toLowerCase()) ||
          item.gender
            .toLowerCase()
            .includes(this.valueSearch.trim().toLowerCase())
      );
      this.datas = dataSearch;
      this.$forceUpdate();
    },

    // Xử lý khi ấn vào check tất cả
    toggleSelectAll(){
      this.selectAllChecked = !this.selectAllChecked;
      this.datas.forEach((checkbox) => {
      checkbox.checked = this.selectAllChecked;
    });
    },

    // Nhận vào vị trí items và thực hiện thay đổi check
    toggleCheckbox(index) {
    this.datas[index].checked = !this.datas[index].checked;
    this.selectAllChecked = this.allChecked;
    },

    // Xóa tất cả các thằng đang chọn
    handleDeleteAll(){
      // Lấy ra dữ liệu mới là các items không được check
      const datanew = this.datas.filter(data => data.checked === false)
      console.log(datanew);
      this.datas = datanew;
      localStorage.setItem("dataOld" , JSON.stringify(datanew));
      this.$forceUpdate();
    }
  },

  // Xử lý tính toán phụ thuộc : tự động được tính toán lại khi reactive mà chúng phụ thuộc thay đổi
  computed: {
  allChecked() {
    return this.datas.every((item) => item.checked);
  },
},
  // mounted() {
  //   this.checkboxRefs = this.$refs.checkboxes;
  //   console.log(this.checkboxRefs);
  //   for (let i = 0; i < this.checkboxRefs.length; i++) {
  //     if (this.checkboxRefs[i].checked) {
  //       console.log("Checkbox " + (i + 1) + " is checked");
  //     }
  //   }
  // },
};
</script>

<style></style>
