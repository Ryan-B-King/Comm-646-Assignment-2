

# [jQuery] - TopButton
\# Quick - Set up

### License - MIT license

![TopButton](./topButton.png)
_ _ _
### [Set up]
```
<!-- jQuery & topButton -->
<script src="./jquery-1.11.3.min.js"></script>
<script src="./topbutton.min.js"></script>
<script>
$(document).ready(function(){
    //Top Button
    $.topbutton({
        htlm : "<i>Top</i>",      //String
        css : "width:50px; height:50px; background:#22b8cf; border:none; font-size:20px;", //String
        scrollAndShow : false,    //Boolean
        scrollSpeed : 150         //Number
    });
    
});
</script>
```
(No Html)
