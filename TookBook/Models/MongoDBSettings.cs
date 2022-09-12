namespace TookBook.Models
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string BookCollectionName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;
        public string CategoryCollectionName { get; set; } = null!;
    }
}
