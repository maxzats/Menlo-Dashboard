package controllers.com.mogo.shared;

import com.avaje.ebean.Ebean;
import models.Bucket;
import models.Category;
import models.Course;
import models.Settings;
import play.Logger;
import play.cache.Cache;
import java.util.List;

/**
 * Author: maxzats
 * Date: 11/13/13
 * Time: 2:02 PM
 * Description:
 *      Cornelius is the database caching system for Mogo applications
 *      It succeeds MZCache as the new DB Cache system
 */
public class Cornelius {

    private static final String[] CACHE_LIST = {
            "courseTypeahead",
            "peTypeahead",
            "categories",
            "coursesByCategory",
            "buckets",
            "appSettings",
            "visibleCourses"
    };

    /**
     * Flush all the cache from the system
     */
    public static void __FLUSHALLCACHE()
    {
        for(int i=0; i<CACHE_LIST.length; i++)
        {
            Cache.remove(CACHE_LIST[i]);
        }
    }

    /**
     * Flush all the cache related to the categories
     */
    public static void __flushCategoriesCache()
    {
        Cache.remove("categories");
    }

    /**
     * Flush all the cache related to the courses
     */
    public static void __flushCoursesCache()
    {
        Cache.remove("courseObjects");
        Cache.remove("courseTypeahead");
        Cache.remove("peTypeahead");
        Cache.remove("coursesByCategory");
        Cache.remove("buckets");
        Cache.remove("visibleCourses");
    }

    /**
     * Flush all the cache related to the required courses
     */
    public static void __flushRequiredCoursesCache()
    {
        Cache.remove("buckets");
        __flushCoursesCache();
    }

    /**
     * Flush the application settings cache
     */
    public static void __flushSettingsCache()
    {
        Cache.remove("appSettings");
    }

    /**
     * Retrieves all the categories from the cache
     * If they are not readily cached, will pull from the DB
     * @return List of categories
     */
    public static List<Category> getAllCategories()
    {
        List<Category> cachedCategories = (List<Category>) Cache.get("categories");

        if(cachedCategories != null)
        {
            return cachedCategories;
        }

        List<Category> categories = Ebean.find(Category.class).findList();

        Cache.set("categories", categories);

        return categories;
    }

    /**
     * Retrieves a list of courses ordered by the category they're in.
     * @return List of Courses, ordered by category
     */
    public static List<Course> getAllCoursesOrderedByCategory()
    {
        List<Course> cachedCourses = (List<Course>) Cache.get("coursesByCategory");

        if(cachedCourses != null)
        {
            return cachedCourses;
        }

        List<Course> courses = Ebean.find(Course.class).order().asc("category").findList();

        Cache.set("coursesByCategory", courses);

        return courses;

    }

    /**
     * Retrieves a list of all the buckets
     * @return List of Buckets
     */
    public static List<Bucket> getAllBuckets()
    {
        List<Bucket> cachedBuckets = (List<Bucket>) Cache.get("buckets");

        if(cachedBuckets != null)
        {
            return cachedBuckets;
        }

        List<Bucket> buckets = Ebean.find(Bucket.class).fetch("courseList").findList();

        Cache.set("buckets", buckets);

        return buckets;
    }

    /**
     * Retrieves the application settings
     * @return Application Settings
     */
    public static Settings getAppSettings()
    {
        Settings cachedSettings = (Settings) Cache.get("appSettings");

        if(cachedSettings != null)
        {
            return cachedSettings;
        }

        Settings settings = Ebean.find(Settings.class).findUnique();

        Cache.set("appSettings", settings);

        return settings;
    }

    /**
     * Retrieves all the visible courses
     * @return List of Visible Courses
     */
    public static List<Course> getAllVisibleCourses()
    {
        List<Course> cachedCourses = (List<Course>) Cache.get("visibleCourses");

        if(cachedCourses != null)
        {
            return cachedCourses;
        }

        List<Course> courses = Ebean.find(Course.class).select("*").where().eq("visible", true).findList();

        Cache.set("visibleCourses", courses);

        return courses;
    }

}
