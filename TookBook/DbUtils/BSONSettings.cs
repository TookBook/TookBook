namespace TookBook.DbUtils
{
using MongoDB.Bson.Serialization.Conventions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Class which contains settings to customize BSON from MongoDB
    /// </summary>
    public static class BSONSettings
    {

        /// <summary>
        /// Registers a CamelCaseElementNameConvention-pack into MongoDB's BSON Settings. 
        /// Makes it easier to create case insensitive models for use in the database, since the naming conventions of C# and MongoDB collections differs.
        /// </summary>
        public static void InitSettings()
        {
            var pack = new ConventionPack();
            pack.Add(new CamelCaseElementNameConvention());

            ConventionRegistry.Register("Camel case convention", pack, _ => true);
        }
    }
}
