<template>
  <div>
    <b-row>
      <b-col v-for="input in inputs" :key="input" cols="3">
        <div
          :data-id="`input-${input}`"
          class="input-group--wrapper"
          @drop="dropped"
          @dragenter="dragIn"
          @dragleave="dragOut"
          @dragover="allowDrop"
        >
          <button type="button" :data-id="`input-${input}`" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <input type="file" accept="image/*" :data-id="`input-${input}`">

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
      inputs: 1,
      files: 0
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
    dropped (event) {
      event.preventDefault()

      event.target.classList.remove('drag')

      const vm = this
      const inputs = document.querySelectorAll('.input-group--wrapper input')
      const delBtns = document.querySelectorAll('.input-group--wrapper button.close')
      const images = document.querySelectorAll('.input-group--wrapper img')

      const wrapper = event.target

      const input = [...inputs].find(x => x.getAttribute('data-id') === wrapper.getAttribute('data-id'))
      const btn = [...delBtns].find(x => x.getAttribute('data-id') === wrapper.getAttribute('data-id'))

      input.files = event.dataTransfer.files
      const imageSrc = URL.createObjectURL(input.files[0])
      const exactImg = [...images].find(img => img.getAttribute('data-id') === input.getAttribute('data-id'))
      const exactDelBtn = [...delBtns].find(btn => btn.getAttribute('data-id') === input.getAttribute('data-id'))

      exactDelBtn.style.display = 'block'
      exactImg.style.display = 'block'
      exactImg.setAttribute('src', imageSrc)
      vm.files++
      vm.inputs = vm.files + 1

      btn.onclick = function (e) {
        e.stopPropagation()
        const input = [...inputs].find(i => i.getAttribute('data-id') === btn.getAttribute('data-id'))
        const img = [...images].find(i => i.getAttribute('data-id') === btn.getAttribute('data-id'))
        input.value = ''

        img.removeAttribute('src')
        img.style.display = 'none'
        btn.style.display = 'none'
        if (vm.inputs > 1) {
          vm.inputs = vm.inputs - 1
        }
      }
    },
    allowDrop (event) {
      event.preventDefault()
      event.target.classList.add('drag')
    },
    dragIn (event) {
      event.preventDefault()
      event.target.classList.add('drag')
    },
    dragOut (event) {
      event.preventDefault()
      event.target.classList.remove('drag')
    },
    initalize () {
      const vm = this
      const wrappers = document.querySelectorAll('.input-group--wrapper')
      const delBtns = document.querySelectorAll('.input-group--wrapper button.close')
      const inputs = document.querySelectorAll('.input-group--wrapper input')
      const images = document.querySelectorAll('.input-group--wrapper img')

      wrappers.forEach((w) => {
        const id = w.getAttribute('data-id')
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

          exactDelBtn.style.display = 'block'
          exactImg.style.display = 'block'
          exactImg.setAttribute('src', imageSrc)
          if (i.value !== '') {
            vm.files++
            vm.inputs = vm.files + 1
          }
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
          if (vm.inputs > 1) {
            vm.files--
          }
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
  margin-bottom: 10px
  background: white
  transition: all 0.4s ease
  &:hover, &.drag
    background: #eee
  &::before
    font-family: "Font Awesome 5 Free"
    font-weight: 900
    content: "\f093"
    transition: all 0.4s ease
    border: 2px dashed #ddd
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
    right: 10px
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
