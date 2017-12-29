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
    console.log(talents)
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

                              <form id="editForm" data-id="${talent._id}>

                              <div class="form-group">
                                 <label for="name">Change Name</label>
                                 <input type="text" name="updateName" class="form-control" value="${talent.name}">
                              </div>
                              <div class="form-group">
                                 <label for="email">Change Email</label>
                                 <input type="text" name="updateEmail" class="form-control" value="${talent.email}">
                              </div>
                              <div class="form-group">
                                 <label for="description">Change Descripton</label>
                                 <input type="text" name="updateDescription" class="form-control" value="${talent.description}">
                              </div>

                              </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

             

          
        </div>
      `);
      });

  }


  function handleError(a,b,c) {
    console.log(`There was an error:${b}     ${a}   ${c}`);
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
    console.log(json)
    $(`#${json._id}`).remove()

  }




// EDIT BUTTON FOR TALENT
  $('#talent_list').on('submit', '#editForm', function(event) {
    console.log(event)

    event.preventDefault();
    var updateUser = $(this).serialize();
    $.ajax({
      method: 'PUT',
      url: '/api/users/'+ $(this).parent().attr('id'),
      data: updateUser,
      success: updateUserSuccess,
      error: handleError
    });
  });

 
  function updateUserSuccess(userEditInDb){
     console.log('response to update', userEditInDb);
     location.reload();
  }



});
