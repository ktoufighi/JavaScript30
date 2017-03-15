<script>

  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

  //assign it to a variable so we know where was the last checkbox
  let lastChecked;

  function handleCheck(e){
      //check if they had shift key down.
      //AND check that they are checking it.
      let inBetween = false;
      if(e.shiftKey && this.checked) {
      //when can go head and do what we want. checking multiple checkboxes.
      //loop over every single checkbox.
      checkboxes.forEach(checkbox => {
        console.log(checkbox);
        if(checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
          console.log('starting to check inbetween');
        }

        if(inBetween) {
          checkbox.checked = true;
        }
      });
    }
    lastChecked = this;
    console.log(e);
  }

  checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

  </script>
