package edu.brown.cs.student.main.Handlers;

import edu.brown.cs.student.main.ACSData.Caching.BroadbandData;
import edu.brown.cs.student.main.ACSData.Caching.BroadbandDatasource;
import edu.brown.cs.student.main.ACSData.CodeConverter;
import edu.brown.cs.student.main.JSONAdaptors.Serializer;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/** A class that handles queries related to broadband. */
public class BroadbandHandler implements Route {
  private BroadbandDatasource sharedState;

  /**
   * The constructor of the BroadbandHandler class that initializes the state.
   *
   * @param state Shared state that holds the broadband data that is needed for caching.
   */
  public BroadbandHandler(BroadbandDatasource state) {
    this.sharedState = state;
  }

  /**
   * A method that handles broadband queries and puts the API response into a JSON to be returned to
   * the user.
   *
   * @param request The request made by the user.
   * @param response
   * @return: a JSON that holds the data to be shown to the user.
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    String state = request.queryParams("state");
    String county = request.queryParams("county");
    // return with error if state or county isn't entered
    if (state == null || county == null) {
      responseMap.put("result", "error_bad_request");
      return new Serializer().serialize(responseMap);
    }

    CodeConverter convertor = new CodeConverter(this.sharedState);
    try {
      String stateCode = convertor.convertState(state.toLowerCase());
      BroadbandData data =
          this.sharedState.getBroadband(
              stateCode, convertor.convertCounty(stateCode, county.toLowerCase()));
      responseMap.put("state", state);
      responseMap.put("county", county);
      responseMap.put("broadband", broadbandConvertor(data));
    } catch (IllegalArgumentException e) {
      responseMap.put("result", "error_bad_request");
    } catch (IOException e) {
      responseMap.put("result", "error_datasource");
    }
    return new Serializer().serialize(responseMap);
  }

  /**
   * A method that converts the BroadbandData record into a 2d array of strings.
   *
   * @param data the broadband record.
   * @return a 2d array of strings containing the broadband data.
   */
  private String[][] broadbandConvertor(BroadbandData data) {
    String[][] array = new String[2][5];
    array[0][0] = "Name";
    array[0][1] = "Percentage";
    array[0][2] = "State";
    array[0][3] = "County";
    array[0][4] = "Time";

    array[1][0] = data.name();
    array[1][1] = data.percentage();
    array[1][2] = data.state();
    array[1][3] = data.county();
    array[1][4] = data.time();

    return array;
  }

  /**
   * A helper method that gets the time of when the query was made.
   *
   * @return the time in a string.
   */
  private String getTime() {
    LocalDateTime dateAndTime = LocalDateTime.now();
    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return dateAndTime.format(format);
  }
}
