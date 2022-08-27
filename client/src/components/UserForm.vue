<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="userForm.fullname"
        placeholder="Name"
      />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input
        type="text"
        class="form-control"
        id="address"
        v-model="userForm.address"
        placeholder="Address"
      />
    </div>

    <div class="form-group">
      <label for="phone">Phone number</label>
      <input
        type="text"
        class="form-control"
        id="phone"
        v-model="userForm.phone"
        placeholder="Phone number"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="text"
        class="form-control"
        id="email"
        v-model="userForm.email"
        placeholder="Email"
      />
    </div>

    <button class="btn btn-success" type="submit">Buy</button>
  </form>
</template>

<script>
export default {
  name: 'UserForm',
  data: () => ({
    userForm: {
      fullname: '',
      phone: '',
      email: '',
      address: '',
    },
  }),
  methods: {
    handleSubmit() {
      this.$emit('onFormSubmit', this.userForm);
    },
  },
};
</script>
