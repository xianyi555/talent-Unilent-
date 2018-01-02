console.log('app.js is working!')	

$(document).ready(function() {
  $("#addTalent").on("submit", function(e){
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/api/talents",
      data: $(this).serialize(),
      success: function create(){
        $('#talent_list').text("")
        $.ajax({
          method: "GET",
          url: "/api/talents",
          success: handleGetSuccess,
          error: handleError
        });
      },
      error: handleError
    })
  })

// GET REQUEST FROM DATABASE
  $.ajax({
    method: "GET",
    url: "/api/talents",
    success: handleGetSuccess,
    error: handleError
  });

  function handleGetSuccess(talents) {
    talents.forEach(function(talent) {
      $('#talent_list').append(`
        <div class="talent_object" id="${talent._id}">
          <div>
            <h4>Check out their talents</h4>
               <p>Talent Name: ${talent.name}</p>
               <p>Email: ${talent.email}</p>
               <p>Descripton: ${talent.description}</p>
          </div>
            <!-- Button trigger modal -->

            <button type="button" class="editBtn btn btn-primary" data-toggle="modal" data-target="#number${talent._id}">EDIT</button>
            <button type="button" class="deleteBtn btn btn-danger">DELETE</button>

                

                    <!-- Modal -->
                    <div class="modal fade" id="number${talent._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Info</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">

                              <form class="editForm" data-id="${talent._id}">

                              <div class="form-group">
                                 <label for="name">Change Name</label>
                                 <input type="text" name="name" class="form-control" value="${talent.name}">
                              </div>
                              <div class="form-group">
                                 <label for="email">Change Email</label>
                                 <input type="text" name="email" class="form-control" value="${talent.email}">
                              </div>
                              <div class="form-group">
                                 <label for="description">Change Descripton</label>
                                 <input type="text" name="description" class="form-control" value="${talent.description}">
                              </div>
                                <button type="button" class="editClose btn btn-secondary pull-right" data-dismiss="modal">Close</button>
                                <button type="submit" class="talentUpdate btn btn-primary pull-right">Save changes</button>

                              </form>
                          </div>
                          <div class="modal-footer" id="${talent._id}">
                          </div>
                        </div>
                      </div>
                    </div>  

             

          
        </div>
      `);
      });

  }


  function handleError(a,b,c) {
    console.log(`There was an error:${b} ${a}   ${c}`);
  }

  $("#talent_list").on("click", ".deleteBtn", function(e){
    console.log($(this).parent().attr('id'))

    $.ajax({
    method: "DELETE",
    url: '/api/talent/'+ $(this).parent().attr('id'),
    success: handleDeleteSuccess,
    error: handleError
    });
  })
    

  function handleDeleteSuccess(json){
    $(`#${json._id}`).remove()

  }




// EDIT BUTTON FOR TALENT
  $('#talent_list').on('click', '.talentUpdate', function(event) {

    event.preventDefault();
    var updateTalent = $(this).parent().serialize();
    $.ajax({
      method: 'PUT',
      url: '/api/talent/'+ $(this).parent().attr('data-id'),
      data: updateTalent,
      success: function update(json){
        console.log(json);
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open')

      },
      error: handleError
    });
      $('#talent_list').text("");
      $.ajax({
        method: "GET",
        url: "/api/talents",
        success: handleGetSuccess,
        error: handleError
      });


  });

});
