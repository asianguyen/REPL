package edu.brown.cs.student.main.ACSData.Caching;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * A class that handles caching functionality for ACS queries by implementing the
 * BroadbandDataSource interface.
 */
public class Caching implements BroadbandDatasource {
  private BroadbandDatasource toWrap;
  private Cache<String, BroadbandData> cache;

  /**
   * The caching class constructor which defines the passed in BroadbandDataSource, the size of the
   * cache, and the time limit for cache expiration.
   *
   * @param toWrap a class that implements BroadbandDatasource
   * @param size size of the cache
   * @param durationInMinutes amount of time before cache expires
   */
  public Caching(BroadbandDatasource toWrap, int size, int durationInMinutes) {
    // set default size and duration if invalid
    if (size < 1) {
      size = 10;
    }
    if (size < durationInMinutes) {
      durationInMinutes = 1;
    }
    this.toWrap = toWrap;
    this.cache =
        CacheBuilder.newBuilder()
            .maximumSize(size)
            .expireAfterWrite(durationInMinutes, TimeUnit.MINUTES)
            .recordStats()
            .build();
  }

  /**
   * A method that returns the response given by ACS and properly uses the data in the cache or
   * loads it into the cache if it isn't there.
   *
   * @param state the state to be searched
   * @param county the county to be searched
   * @return the broadband data of the state and county
   * @throws IOException invalid input/output
   */
  @Override
  public BroadbandData getBroadband(String state, String county) throws IOException {
    BroadbandData data = this.cache.getIfPresent(state + county);
    if (data == null) {
      data = this.toWrap.getBroadband(state, county);
      this.cache.put(state + county, data);
    }
    return data;
  }
}
