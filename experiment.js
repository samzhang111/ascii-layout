(function() {
    // Actual dimensions of a single character
    var cdims,
        default_box_hfill = "=",
        default_box_vfill = "|",
        mouseover_hfill = "~",
        mouseover_vfill = "*";

    document.addEventListener("DOMContentLoaded", function(event) {
        cdims = get_char_dims();


        var to_box = document.getElementsByClassName('ascii-box');

        for (var i=0; i<to_box.length; i++) {

            // Take each element, create div box with abs positioning 
            // around it
            //
            
            // Get positional (location) dimensions of box
            var pdims = to_box[i].getBoundingClientRect(),

                // Get structural dimensions of box
                sdims = get_div_dims(to_box[i]),
                bounding_box = redraw(pdims, sdims, default_box_hfill, 
                            default_box_vfill);

            // Is the box clickable?
            if (to_box[i].classList.contains('clickable')) {
                // If so, set up event handler for mouseovers
                bounding_box.onmouseover = mouseover_handler;
            }

        }
    });
    function mouseover_handler(e) {
        var sdims = { h: this.dataset.sdims_h,
                      w: this.dataset.sdims_w },
            pdims = { top: this.dataset.pdims_top,
                      left: this.dataset.pdims_left },
            parent = this.parentNode;

        parent.removeChild(this);

        var bbox = redraw(pdims, sdims, mouseover_hfill, 
                            mouseover_vfill);
    
        bbox.style.cursor = "pointer";
        bbox.onmouseout = mouseout_handler;
    }
    
    function mouseout_handler(e) {
        var sdims = { h: this.dataset.sdims_h,
                      w: this.dataset.sdims_w },
            pdims = { top: this.dataset.pdims_top,
                      left: this.dataset.pdims_left },
            parent = this.parentNode;

        parent.removeChild(this);
        var bbox = redraw(pdims, sdims, default_box_hfill, 
                            default_box_vfill);

        bbox.style.cursor = "auto";
        bbox.onmouseover = mouseover_handler;
    }
    function redraw(pdims, sdims, box_filler, ends) {
            
            // Generate bounding box string using structural dims
        var box_text = make_box(sdims.w, sdims.h, box_filler, ends),
            // Set bounding box to where element is
            bounding_box = document.createElement('div');

        // Generate random ID for the boundary box
        bounding_box.className = 'box-outline';
        bounding_box.style.left = pdims.left - cdims.w + 'px';
        bounding_box.style.top = pdims.top - 1.9*cdims.h + 'px';
        
        // Construct box based off height and width of element
        bounding_box.innerHTML = box_text;
        bounding_box.dataset.sdims_h = sdims.h;
        bounding_box.dataset.sdims_w = sdims.w;
        bounding_box.dataset.pdims_left = pdims.left;
        bounding_box.dataset.pdims_top = pdims.top;

        document.body.appendChild(bounding_box);

        return bounding_box;
    }

    function make_box(width, height, filler, ends) {
        var cw = Math.floor(width / cdims.w) + 1,
            ch = Math.floor(height / cdims.h),
            box = "<pre>",
            row_filler = filler;
        
        // Make top row
        box += draw_box_row(row_filler, cw, ends);
        
        // Make bounding sides
        for (var j=0; j<ch; j++) {
            box += draw_box_row("&nbsp;", cw, ends);
        }
        
        // Make box bottom
        box += draw_box_row(row_filler, cw, ends);
        
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
        
        return cdims;
    }
    
    // Draw box row
    function draw_box_row(filler, width, ends) {
        var vfill_left = ends,
            vfill_right = ends;
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
