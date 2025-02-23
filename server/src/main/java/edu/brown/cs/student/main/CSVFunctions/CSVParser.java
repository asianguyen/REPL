package edu.brown.cs.student.main.CSVFunctions;

import edu.brown.cs.student.main.CSVFunctions.CreatorFromRowClasses.CreatorFromRow;
import edu.brown.cs.student.main.CSVFunctions.CreatorFromRowClasses.FactoryFailureException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * A class that parses a CSV into a List of generic objects.
 *
 * @param <T> Generic type so the CSVParser can return a generic List.
 */
public class CSVParser<T> {

  private final BufferedReader bReader;
  private final CreatorFromRow<T> creator;

  private static final Pattern regexSplitCSVRow =
      Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");

  /**
   * Constructor for the CSVParser class that wraps the passed in Reader object in a BufferedReader
   * object for easier use.
   *
   * @param reader a reader object to read from.
   * @param creator a class that defines how to treat rows of the CSV.
   */
  public CSVParser(Reader reader, CreatorFromRow<T> creator) {
    this.bReader = new BufferedReader(reader);
    this.creator = creator;
  }

  /**
   * Method that parses the CSV and returns a List<T> of each row of the CSV. The create method
   * called by the CreatorFromRow object defines T.
   *
   * @return - List of each row object.
   * @throws FactoryFailureException
   * @throws IOException
   */
  public List<T> parse() throws FactoryFailureException, IOException {
    List<T> parsedCSV = new ArrayList<>();
    String line = this.bReader.readLine();
    while (line != null) {
      List<String> row = List.of(this.regexSplitCSVRow.split(line));
      parsedCSV.add(this.creator.create(row));
      line = bReader.readLine();
    }
    this.bReader.close();
    return parsedCSV;
  }
}
