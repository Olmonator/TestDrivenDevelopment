var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("backstage pass", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).to.equal(8);
  });

  it("backstage pass 2", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).to.equal(0);
  });

  it("Not Sulfuras", () => {
    const gildedRose = new Shop([new Item("Not Sulfuras, Hand of Ragnaros", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Not Sulfuras, Hand of Ragnaros");
    expect(items[0].quality).to.equal(3);
  });

  it("aged brie ", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].quality).to.equal(7);
  });

  describe("mutation coverage", () => {

    it("line 10 - array decleration", () => {
      const gildedRose = new Shop();
      items = gildedRose.items;
      expect(items[0]).to.undefined;
    }); 

    it("line 17 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Foo", 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("Foo");
      expect(items[0].quality).to.equal(0);
    });

    it("line 18 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
    });

    it("line 23 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("line 26 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(1);
    });

    it("line 27 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("line 31 - <= 6 mutation", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
    });

    it("line 32 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("line 39 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 11, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(11);
    });

    it("line 43 - sellIn <= [<]", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(7);
    });

    it("line 42 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("foo", 1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(1);
    });

    it("line 45 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("foo", -1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("line 46 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
    });

    it("line 54 - if(true) mutation", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });
});

describe("tests after refactoring (system knowledge)", () => {
  it("Sulfuras never decreases in value", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
  });

  it("Items decrease sell date", () => {
    const gildedRose = new Shop([new Item("Not Sulfuras, Hand of Ragnaros", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
    expect(items[0].sellIn).to.equal(4);
  });

  it("Backstage Passes only increase by 2 in 10 days (inclusive 10)", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
  });

  it("Aged Brie increases value by two before sell date", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 20, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
  });

  describe("Tests for conjured items", () => {
    it("quality reduces twice as fast before sell date (2 per day)", () => {
      const gildedRose = new Shop([new Item("Conjured", 20, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
    });

    it("quality reduces twice as fast after sell date (4 per day)", () => {
      const gildedRose = new Shop([new Item("Conjured", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(6);
    });
  })
});