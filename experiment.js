(function() {
    // Actual dimensions of a single character
    var cdims;

    document.addEventListener("DOMContentLoaded", function(event) {
        cdims = get_char_dims();


        var to_box = document.getElementsByClassName('ascii-box');

        console.log(to_box);
        for (var i=0; i<to_box.length; i++) {

            // Take each element, create div box with abs positioning 
            // around it
            //
            
            // Get positional (location) dimensions of box
            var pdims = to_box[i].getBoundingClientRect(),

                // Get structural dimensions of box
                sdims = get_div_dims(to_box[i]),
                
                // Generate bounding box string using structural dims
                box_text = make_box(sdims.w, sdims.h),

            // Set bounding box to where element is
            bounding_box = document.createElement('div');
            bounding_box.className = 'box-outline';
            bounding_box.style.left = pdims.left - cdims.w + 'px';
            bounding_box.style.top = pdims.top - 1.9*cdims.h + 'px';

            // Construct box based off height and width of element
            
            console.log(box_text);
            bounding_box.innerHTML = box_text;

            document.body.appendChild(bounding_box);
        }
    });

    function make_box(width, height) {
        var cw = Math.floor(width / cdims.w) + 1,
            ch = Math.floor(height / cdims.h),
            box = "<pre>",
            row_filler = "=";
        
        console.log(width, height, cdims.w, cdims.h, cw, ch);
        // Make top row
        box += draw_box_row(row_filler, cw);
        
        // Make bounding sides
        for (var j=0; j<ch; j++) {
            box += draw_box_row("&nbsp;", cw);
        }
        
        // Make box bottom
        box += draw_box_row(row_filler, cw);
        
        box += "</pre>";
        return box;
    }
    
    // Measure the dimensions of a character on window load
    function get_char_dims() { 
        var test_div = document.getElementById('measure'),
            cdims = {};
        test_div.innerHTML = 'a';
        cdims.w = test_div.clientWidth;
        cdims.h = test_div.clientHeight;
        test_div.innerHTML = '';
        
        console.log('cdims:', cdims);
        return cdims;
    }
    
    // Draw box row
    function draw_box_row(filler, width) {
        var vfill_left = "|",
            vfill_right = "|";
        var row = "";

        row += vfill_left;
        for (var i=0; i<width-1; i++) {
            row += filler;
        }
        row += vfill_right + "\n";

        return row;
    }
    function get_div_dims(div) {
        var test_div = document.getElementById('measure'), dims;

        test_div.innerHTML = div.innerHTML;
        dims = {
                w: test_div.clientWidth,
                h: test_div.clientHeight
            };

        return dims;
    }

})();
