
# CBS Yazılım Geliştirici Teknik Değerlendirme Ödevi

Üsküdar'daki mevcut otoparkların durumunu gösteren ve en yakındaki otopark önerilerini sunan bir web uygulaması.
> Web sitesini bu linkten kontrol edebilirsiniz: [ISPARK MAP UI](https://ispark-teknik-odev-frontend-9b78100911ff.herokuapp.com/)

## Arayüz Özellikleri

### Harita Özellikleri
- Otoparkları nokta olarak gösterme
- Her otopark için açılır pencere (popup) ile bilgi gösterimi
- Mahalle sınırlarını gösterme
- Konum bazlı arama

### Otopark Filtreleme
- Doluluk oranına göre
- Ücrete göre

### Dashboard
- Toplam otopark sayısı ve kapasite
- Anlık doluluk oranları
- Mahalle bazlı otopark dağılımı grafiği

  
## API Kullanımı

#### İspark Verilerini Getir

```http
GET /api/ispark-data
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Tüm İspark verilerini döndürür. |

#### En Yakın Park Alanlarını Getir

```http
POST /api/nearest-parking
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `lat`      | `float` | **Gerekli**. Kullanıcının enlem bilgisi.|
| `lng`      | `float` | **Gerekli**.  Kullanıcının boylam bilgisi.|
| `radius`      | `float` | **Gerekli**.  Arama yapılacak alan (km).|
| `limit`      | `float` | **Gerekli**.  Çekilecek veri sayısı.|

#### fetchNearbyParking(lat, lng, radius = 5, limit = 30)

Kullanıcının mevcut konumuna göre 5km alan içerisindeki en yakın 30 otoparkı listeler.

#### Sürüş Bilgisi Getir

```http
POST /api/drive-info
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `lat`      | `float` | **Gerekli**. Kullanıcının enlem bilgisi.|
| `lng`      | `float` | **Gerekli**.  Kullanıcının boylam bilgisi.|
| `parkingLots`      | `array` | **Gerekli**.   Park alanlarının listesi.|

#### fetchDrivingInfo(lat, lng, parkingLots)

Openstreetmap servisinden **Sürüş Süresi** ve **Mesafe** bilgilerini çeker.

#### Otopark İstatistiklerini Getir

```http
GET /api/parking-statistics
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Park alanı istatistiklerini döndürür. |

#### fetchParkingStatistics()

ISPARK API'sinden **Toplam Otopark Sayısı**,**Boş Kapasite** ve **Mahalle Bazlı Otopark Bilgileri**ni çeker.

#### Park Alanlarını Filtrele

```http
POST /api/filter-parking
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `emptyCapacity`      | `bool` | Mevcut veriyi **Boş kapasite**lere göre filtreler.|
| `freeTime`      | `bool` | Mevcut veriyi **Ücretsiz süre**ye göre filtreler.|

#### fetchFilteredParking(emptyCapacity = true, freeTime = true)

Mevcut verileri **Boş kapasite**ye ve **Ücretsiz süre**ye göre filtreler.
