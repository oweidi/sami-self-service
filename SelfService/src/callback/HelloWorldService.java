package callback;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/hello")
public class HelloWorldService {

	@GET
	@Path("/hi")
	public Response getMsg() {

		String output = "Jersey say : hi";

		return Response.status(200).entity(output).build();

	}

}
