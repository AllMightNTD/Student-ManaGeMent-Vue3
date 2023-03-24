<template>
  <div class="mt-8 px-5">
    <div
      className="block border w-full flex shadow-sm mb-5 border-slate-300 overflow-hidden rounded-xl"
    >
      <input
        type="text"
        v-model="valueSearch"
        name="search"
        className="px-3 outline-none bg-white lock w-full rounded-md sm:text-sm"
        placeholder="Input your text search"
      />
      <button @click="HandleSearch" className="px-2 py-2 w-[100px] flex items-center justify-center bg-cyan-400 text-white font-bold rounded-xl"
      >
        Tìm Kiếm
      </button>
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
          <td class="border border-slate-700 ..."><input type="checkbox" /></td>
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
export default {
  data() {
    return {
      valueSearch:"",
      datas: localStorage.getItem("dataOld")
        ? JSON.parse(localStorage.getItem("dataOld"))
        : [],
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
    HandleSearch(){
      console.log(this.valueSearch);
      const dataSearch = this.datas.filter(
            (item) =>
                item.code.toLowerCase().includes(this.valueSearch.trim().toLowerCase()) ||
                item.name.toLowerCase().includes(this.valueSearch.trim().toLowerCase()) ||
                item.date.toLowerCase().includes(this.valueSearch.trim().toLowerCase()) ||
                item.gender.toLowerCase().includes(this.valueSearch.trim().toLowerCase()),
        );
      this.datas = dataSearch;
      this.$forceUpdate();
    }
  },
};
</script>

<style></style>
