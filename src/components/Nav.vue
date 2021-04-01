<template functional>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">AT SQL Editor</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </header>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bd-subnavbar {
  position: relative;
  z-index: 1020;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 15%);
}
</style>
