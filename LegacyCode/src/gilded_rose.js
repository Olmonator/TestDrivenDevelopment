class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  } 

  // doesn't alter quality if 50
  increaseQualityIfPossible(quality, mod) {
    if (quality  == 50) {
      return quality;
    } else {
      return quality + mod;
    }
  }

  decreaseQualityIfPossible(quality, mod) {
    if (quality  == 0) {
      return quality;
    } else {
      return quality - mod;
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {

      if (this.items[i].sellIn > 0) {
        switch (this.items[i].name) {
          case "Aged Brie":
            this.items[i].quality = this.increaseQualityIfPossible(this.items[i].quality, 2);
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            this.items[i].quality = this.increaseQualityIfPossible(this.items[i].quality, 1);
            if (this.items[i].sellIn <= 10) {
              this.items[i].quality = this.increaseQualityIfPossible(this.items[i].quality, 1);
            }
            if (this.items[i].sellIn <= 5) {
              this.items[i].quality = this.increaseQualityIfPossible(this.items[i].quality, 1);
            }
            break;
      
          case "Sulfuras, Hand of Ragnaros":
            this.items[i].quality = 80;
            break;
          case "Conjured":
            this.items[i].quality = this.decreaseQualityIfPossible(this.items[i].quality, 2);
            break;

          default:
            this.items[i].quality = this.decreaseQualityIfPossible(this.items[i].quality, 1);
            break;
        }        
      }

      if (this.items[i].sellIn <= 0) {
        switch (this.items[i].name) {
          case "Aged Brie":
            this.items[i].quality = this.increaseQualityIfPossible(this.items[i].quality, 2);
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            this.items[i].quality = 0;
            break;
      
          case "Sulfuras, Hand of Ragnaros":
            this.items[i].quality = 80;
            break;

          case "Conjured":
            this.items[i].quality = this.decreaseQualityIfPossible(this.items[i].quality, 4);
            break;

          default:
            this.items[i].quality = this.decreaseQualityIfPossible(this.items[i].quality, 2);
            break;
        }        
      }

      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
