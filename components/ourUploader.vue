<template>
  <div>
    <b-row>
      <b-col v-for="input in inputs" :key="input" cols="3">
        <div :data-id="`input-${input}`" class="input-group--wrapper">
          <button type="button" :data-id="`input-${input}`" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <input type="file" :data-id="`input-${input}`">

          <img :data-id="`input-${input}`">
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputs: 1
    }
  },
  watch: {
    inputs (val) {
      this.$nextTick(() => {
        this.initalize()
      })
    }
  },
  mounted () {
    this.initalize()
  },
  methods: {
    initalize () {
      const vm = this
      const wrappers = document.querySelectorAll('.input-group--wrapper')
      const delBtns = document.querySelectorAll('.input-group--wrapper button.close')
      const inputs = document.querySelectorAll('.input-group--wrapper input')
      const images = document.querySelectorAll('.input-group--wrapper img')

      wrappers.forEach((w) => {
        const id = w.getAttribute('data-id')
        console.log(id)
        w.onclick = function () {
          [...inputs].find(i => i.getAttribute('data-id') === id).click()
        }
      })

      inputs.forEach((i) => {
        i.onchange = function (e) {
        // Handle File Here
          const imageSrc = URL.createObjectURL(i.files[0])
          const exactImg = [...images].find(img => img.getAttribute('data-id') === i.getAttribute('data-id'))
          const exactDelBtn = [...delBtns].find(btn => btn.getAttribute('data-id') === i.getAttribute('data-id'))

          console.log(exactDelBtn)
          exactDelBtn.style.display = 'block'
          exactImg.style.display = 'block'
          exactImg.setAttribute('src', imageSrc)
          vm.inputs = vm.inputs + 1
        }
      })

      delBtns.forEach((btn) => {
        btn.onclick = function (e) {
          e.stopPropagation()
          const input = [...inputs].find(i => i.getAttribute('data-id') === btn.getAttribute('data-id'))
          const img = [...images].find(i => i.getAttribute('data-id') === btn.getAttribute('data-id'))
          input.value = ''

          img.removeAttribute('src')
          img.style.display = 'none'
          btn.style.display = 'none'
          input.style.display = 'block'
          vm.inputs = vm.inputs - 1
        }
      })
    }
  }
}
</script>

<style lang="sass">
.input-group--wrapper
  cursor: pointer
  width: 100%
  height: 150px
  position: relative
  overflow: hidden
  font-family: "Font Awesome 5 Free" !important
  &::after
    transition: all 0.4s ease
    background-color: #eeeeee
    border: 2px solid #ddd
    border-radius: 5px
    content: "\f093" !important
    display: flex
    justify-content: center
    align-items: center
    color: #aaa
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  button.close
    position: absolute
    top: 0
    right: 0
    display: none
    z-index: 4
    color: white

  input
    appearance: none
    display: none

  img
    position: absolute
    display: none
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 2

</style>
