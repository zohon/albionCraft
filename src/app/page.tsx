"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

// https://www.albion-online-data.com/api-info/api-info.html

interface Item {
  name: string;
}

interface ItemPrice {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

interface Item {
  name: string;
  label?: string;
  extra?: string;
  enchant?: boolean;
  display?: boolean;
  type?: "ressource";
  ressources?: { name: string; quantity: number }[];
}

interface CleanItem {
  item_id: string;
  label?: string;
  type?: Item["type"];
  profit?: number;
  costs?: {
    name: string;
    label?: string;
    price: number;
    city: string;
    quantity: number;
  }[];
  cost?: number;
  sell: {
    price: number;
    city: string;
  };
  buy: {
    price: number;
    city: string;
  };
  info?: ItemPrice[];
}

export default function Home() {
  //https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json
  let allNames = useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json"
    )
      .then((response) => response.json())
      .then((data) => {
        allNames = data;
      });
  }, []);
  /*
  let itemsInfo = [
    {
      name: "MAIN_DAGGER",
      label: "Dagger",
      ressources: [
        {
          name: "METALBAR",
          quantity: 12,
        },
        {
          name: "LEATHER",
          quantity: 12,
        },
      ],
    },
    {
      name: "2H_DAGGERPAIR",
      label: "Dagger Pair",
      ressources: [
        {
          name: "METALBAR",
          quantity: 16,
        },
        {
          name: "LEATHER",
          quantity: 16,
        },
      ],
    },
    {
      name: "2H_CLAWPAIR",
      label: "Claws",
      ressources: [
        {
          name: "METALBAR",
          quantity: 12,
        },
        {
          name: "LEATHER",
          quantity: 20,
        },
      ],
    },
    {
      name: "MAIN_DAGGER_HELL",
      label: "DemonFang",
      ressources: [
        {
          name: "ARTEFACT_MAIN_DAGGER_HELL",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 12,
        },
        {
          name: "LEATHER",
          quantity: 12,
        },
      ],
    },
    {
      name: "DAGGER_KATAR_AVALON",
      label: "Bridled Fury",
      ressources: [
        {
          name: "DAGGER_KATAR_AVALON",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 12,
        },
        {
          name: "LEATHER",
          quantity: 20,
        },
      ],
    },
    {
      name: "2H_DAGGERPAIR_CRYSTAL",
      label: "Twin Slayers",
      ressources: [
        {
          name: "ARTEFACT_2H_DAGGERPAIR_CRYSTAL",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 16,
        },
        {
          name: "LEATHER",
          quantity: 16,
        },
      ],
    },
    {
      name: "MAIN_RAPIER_MORGANA",
      label: "Bloodletter",
      ressources: [
        {
          name: "ARTEFACT_MAIN_RAPIER_MORGANA",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 16,
        },
        {
          name: "LEATHER",
          quantity: 8,
        },
      ],
    },
    {
      name: "2H_DUALSICKLE_UNDEAD",
      label: "Deathgivers",
      ressources: [
        {
          name: "ARTEFACT_2H_DUALSICKLE_UNDEAD",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 16,
        },
        {
          name: "LEATHER",
          quantity: 16,
        },
      ],
    },
    {
      name: "2H_DAGGER_KATAR_AVALON",
      label: "Bridled Fury",
      ressources: [
        {
          name: "ARTEFACT_2H_DAGGER_KATAR_AVALON",
          quantity: 1,
        },
        {
          name: "METALBAR",
          quantity: 12,
        },
        {
          name: "LEATHER",
          quantity: 20,
        },
      ],
    },
  ];
*/
  let itemsInfo = [
    {
      name: "MAIN_NATURESTAFF_CRYSTAL",
      label: "Forgebark Staff",
      ressources: [
        {
          name: "ARTEFACT_MAIN_NATURESTAFF_CRYSTAL",
          quantity: 1,
        },
        {
          name: "PLANKS",
          quantity: 16,
        },
        {
          name: "CLOTH",
          quantity: 8,
        },
      ],
    },
    {
      name: "MAIN_NATURESTAFF_AVALON",
      label: "Ironroot Staff",
      ressources: [
        {
          name: "ARTEFACT_MAIN_NATURESTAFF_AVALON",
          quantity: 1,
        },
        {
          name: "PLANKS",
          quantity: 16,
        },
        {
          name: "CLOTH",
          quantity: 8,
        },
      ],
    },
    {
      name: "2H_NATURESTAFF_KEEPER",
      label: "Rampant Staff",
      ressources: [
        {
          name: "ARTEFACT_2H_NATURESTAFF_KEEPER",
          quantity: 1,
        },
        {
          name: "PLANKS",
          quantity: 20,
        },
        {
          name: "CLOTH",
          quantity: 12,
        },
      ],
    },
    {
      name: "MAIN_NATURESTAFF_KEEPER",
      label: "Druidic Staff",
      ressources: [
        {
          name: "ARTEFACT_MAIN_NATURESTAFF_KEEPER",
          quantity: 1,
        },
        {
          name: "PLANKS",
          quantity: 16,
        },
        {
          name: "CLOTH",
          quantity: 8,
        },
      ],
    },
    {
      name: "MAIN_NATURESTAFF",
      label: "Nature Staff",
      ressources: [
        {
          name: "PLANKS",
          quantity: 16,
        },
        {
          name: "CLOTH",
          quantity: 8,
        },
      ],
    },
    {
      name: "2H_NATURESTAFF",
      label: "Great Nature Staff",
      ressources: [
        {
          name: "PLANKS",
          quantity: 20,
        },
        {
          name: "CLOTH",
          quantity: 12,
        },
      ],
    },
    {
      name: "2H_NATURESTAFF_HELL",
      label: "Blight Staff",
      ressources: [
        {
          name: "ARTEFACT_2H_NATURESTAFF_HELL",
          quantity: 1,
        },
        {
          name: "PLANKS",
          quantity: 20,
        },
        {
          name: "CLOTH",
          quantity: 12,
        },
      ],
    },
    {
      name: "2H_WILDSTAFF",
      label: "Wild Staff",
      ressources: [
        {
          name: "PLANKS",
          quantity: 20,
        },
        {
          name: "CLOTH",
          quantity: 12,
        },
      ],
    },

    {
      name: "PLANKS",
      label: "Plank",
      ressources: [
        {
          name: "WOOD",
          quantity: 3,
        },
        {
          name: "PLANKS",
          quantity: 1,
          tier: -1,
        },
      ],
      type: "ressource",
    },
  ];

  let reduceItem = itemsInfo.reduce((acc, item) => {
    const ressources = item.ressources.map(({ name, tier }) => {
      return {
        name,
        extra: "_LEVEL",
        type: "ressource",
        tier,
      };
    });
    return [...acc, ...ressources, item];
  }, []);

  reduceItem = reduceItem.sort((a, b) => {
    if (a.type === undefined && b.type !== undefined) return -1;
    if (a.type !== undefined && b.type === undefined) return 1;
    return 0;
  });

  console.log("reduceItem", reduceItem);

  const items = useMemo(() => reduceItem, []);

  const [filtersState, setFilters] = useState({
    name: "",
    enchant: 0,
    tier: 5,
    quality: 1,
    withoutCity: ["Black Market"],
  });
  const [prices, setPrices] = useState<ItemPrice[]>([]);

  const transformItemToCall = useCallback(
    ({ name, extra, enchant }: Item, tier: number) => {
      if (filtersState.tier) {
        if (tier) {
          name = "T" + (filtersState.tier + tier) + "_" + name;
        } else {
          name = "T" + filtersState.tier + "_" + name;
        }
      }

      if (enchant !== false && filtersState.enchant > 0) {
        if (extra) {
          name = name + extra + filtersState.enchant;
        }
        name = name + "@" + filtersState.enchant;
      }

      return name;
    },
    [filtersState.tier, filtersState.enchant]
  );

  useEffect(() => {
    let allItems = items;

    if (filtersState.name) {
      allItems = allItems.filter(
        ({ name, type }) => type === "ressource" || name === filtersState.name
      );
    }

    const allItemsString = allItems
      .map((item) => transformItemToCall(item, item.tier))
      .join(",");

    fetch(
      `https://europe.albion-online-data.com/api/v2/stats/Prices/${allItemsString}.json`
    )
      .then((res) => res.json())
      .then((data: ItemPrice[]) => setPrices(data))
      .catch((err) => console.error(err));
  }, [
    filtersState.tier,
    filtersState.enchant,
    filtersState.name,
    items,
    transformItemToCall,
  ]);

  const calcProfit = (info: ItemPrice[]) => {
    const highest = info
      .filter(({ quality }) => quality === filtersState.quality)
      .filter(({ city }) => !filtersState.withoutCity.includes(city))
      .reduce<{ price: number; city: string }>(
        (max, curr) =>
          curr.sell_price_min > max.price
            ? { price: curr.sell_price_min, city: curr.city }
            : max,
        { price: 0, city: "" }
      );

    return {
      price: highest.price,
      city: highest.city,
    };
  };

  const calcBuy = (info: ItemPrice[]) => {
    const highest = info
      .filter(({ quality }) => quality === filtersState.quality)
      .filter(({ city }) => !filtersState.withoutCity.includes(city))
      .filter(({ sell_price_min }) => sell_price_min > 0)
      .reduce<{ price: number; city: string }>(
        (max, curr) =>
          max.price == 0 || curr.sell_price_min < max.price
            ? { price: curr.sell_price_min, city: curr.city }
            : max,
        { price: 0, city: "" }
      );

    return {
      price: highest.price,
      city: highest.city,
    };
  };

  const tax = 0.08;
  const calculateBenef = (price: number, cost: number | undefined) => {
    return Math.round(price * (1 - tax) - (cost ?? 0));
  };

  const getName = (id: string) => {
    console.log("getName");
    return (
      allNames?.find(
        ({ LocalizationNameVariable }) => LocalizationNameVariable === id
      )["En-US"] ?? id
    );
  };

  const renderItems = (allitems: CleanItem[]) => {
    return allitems.map(
      ({ item_id, label, sell, cost, buy, costs, info, type }) => {
        const calcBenef = calculateBenef(sell.price, cost);

        // Calculate median sell_price_min from info
        let medianPrice = 0;
        if (info && info.length > 0) {
          const prices = info
            .filter(({ city }) => !filtersState.withoutCity.includes(city))
            .map((i) => i.sell_price_min)
            .filter((p) => p > 0)
            .sort((a, b) => a - b);
          if (prices.length > 0) {
            const mid = Math.floor(prices.length / 2);
            if (prices.length % 2 === 0) {
              medianPrice = Math.round((prices[mid - 1] + prices[mid]) / 2);
            } else {
              medianPrice = prices[mid];
            }
          }
        }

        let benefNumber = (
          <div
            className={`${styles.displayBenef} ${
              styles[`city-${sell.city.replace(/\s+/g, "").toLowerCase()}`]
            }`}
          >
            {renderNumber(calcBenef)}
          </div>
        );

        let displayBenefdorLowPrice = (
          <div
            className={`${styles.cityInfo} ${
              styles[`city-${sell.city.replace(/\s+/g, "").toLowerCase()}`]
            }`}
          >
            {sell.city} {renderNumber(sell.price)}
          </div>
        );

        if (type === "ressource") {
          displayBenefdorLowPrice = (
            <div
              className={`${styles.cityInfo} ${
                styles[`city-${buy.city.replace(/\s+/g, "").toLowerCase()}`]
              }`}
            >
              {buy.city} {renderNumber(buy.price)}
            </div>
          );

          benefNumber = (
            <div
              className={`${styles.displayBenef} ${
                styles[`city-${buy.city.replace(/\s+/g, "").toLowerCase()}`]
              }`}
            >
              {renderNumber(buy.price)}
            </div>
          );
        }

        const MedianBenef = (
          <div className={`${styles.displayMedianBenef}`}>
            {renderNumber(calculateBenef(medianPrice, cost))}
          </div>
        );

        return (
          <div key={item_id} className={styles.item}>
            <div
              className={styles.title}
              title={item_id}
              onClick={() => {
                if (label) {
                  navigator.clipboard.writeText(label);
                }
              }}
              style={{ cursor: label ? "pointer" : undefined }}
            >
              {benefNumber}
              {MedianBenef}
              <div className={styles.icon}>
                <Image
                  src={`https://render.albiononline.com/v1/item/${item_id}.png`}
                  alt={label || item_id}
                  width={40}
                  height={40}
                  unoptimized
                />
              </div>
              <div>
                {label || getName(item_id)}
                {displayBenefdorLowPrice}
              </div>
            </div>
            <div className={styles.highest}>
              Highest sell price:
              <div
                className={`${styles.cityInfo} ${
                  styles[`city-${sell.city.replace(/\s+/g, "").toLowerCase()}`]
                }`}
              >
                {sell.city}: {renderNumber(sell.price)}
              </div>
              {/* Benef: {renderNumber(calculateBenef(sell.price, cost))} */}
            </div>
            {costs && renderCost(cost, costs)}

            <div className={styles.lowest}>
              Lowest buy price:
              <div
                className={`${styles.cityInfo} ${
                  styles[`city-${buy.city.replace(/\s+/g, "").toLowerCase()}`]
                }`}
              >
                {buy.city}: {renderNumber(buy.price)}
              </div>
            </div>
            <div className={styles.lowest}>
              Median price:&nbsp;
              {renderNumber(medianPrice)}
            </div>
            <div className={styles.cities}>
              {info
                ?.slice()
                .sort((a, b) => b.sell_price_min - a.sell_price_min)
                .map((data) => (
                  <div
                    key={item_id + data.city.replace(/\s+/g, "")}
                    className={`${styles.cityInfo} ${
                      styles[
                        `city-${data.city.replace(/\s+/g, "").toLowerCase()}`
                      ]
                    } ${
                      calculateBenef(data.sell_price_min, cost) > 0
                        ? styles.benef
                        : ""
                    }`}
                    title={data.city}
                  >
                    {/* {data.city} */}
                    {renderNumber(data.sell_price_min)}
                    {renderClock(data.sell_price_min_date)}
                  </div>
                ))}
            </div>
          </div>
        );
      }
    );
  };

  const renderClock = (dateInfo: string) => {
    if (!dateInfo) return;

    const timeLimit = 6;

    return (
      <span
        style={{ marginLeft: 4 }}
        className={styles.clock}
        title={formatTimeAgo(dateInfo)}
      >
        {(() => {
          if (!dateInfo || dateInfo === "0001-01-01T00:00:00") return null;
          const date = new Date(dateInfo);
          const now = new Date();
          const diffMs = now.getTime() - date.getTime();
          const diffHr = diffMs / (1000 * 60 * 60);
          if (diffHr >= timeLimit) {
            return (
              <span
                style={{
                  color: "black",
                  marginLeft: 4,
                  verticalAlign: "middle",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  style={{ display: "inline" }}
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 5v5l3 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            );
          } else {
            return (
              <span
                style={{
                  color: "white",
                  marginLeft: 4,
                  verticalAlign: "middle",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  style={{ display: "inline" }}
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 5v5l3 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            );
          }
        })()}
      </span>
    );
  };

  const getProductFromId = (id: string) => {
    return items.find((item) => transformItemToCall(item, item.tier) === id);
  };

  const CalculCost = (info: ItemPrice[], id: string) => {
    const currentItem = items.find(
      (item) => transformItemToCall(item, item.tier) === id && item.ressources
    );

    if (!currentItem) return;
    console.log("CalculCost", id, currentItem.ressources);
    const allPrice = currentItem.ressources?.map(({ name, quantity, tier }) => {
      const currentRessource = items.find(
        ({ name: ressourceName }) => ressourceName === name
      );
      if (currentRessource) {
        const searchItem = allitems.filter(
          ({ item_id }) =>
            item_id === transformItemToCall(currentRessource, tier)
        );

        const lowBuy = searchItem
          .filter(({ sell_price_min }) => sell_price_min > 0)
          .toSorted((a, b) => a.sell_price_min - b.sell_price_min)[0];

        return {
          name,
          label: currentRessource?.label,
          price: lowBuy?.sell_price_min,
          city: lowBuy?.city,
          quantity,
        };
      }
    });

    const totalCost = allPrice?.reduce(
      (sum, val) => sum + (val?.price ?? 0) * (val?.quantity ?? 0),
      0
    );

    return {
      cost: totalCost,
      detail: allPrice,
    };
  };

  const itemToImg = (name: string) => {
    if (filtersState.tier) {
      name = "T" + filtersState.tier + "_" + name;
    }

    return name;
  };

  const renderNumber = (number: number): string => {
    return number?.toLocaleString("en-US").replace(/,/g, " ");
  };

  const renderCost = (cost: number | undefined, costs: CleanItem["costs"]) => {
    return (
      <div className={styles.costRender}>
        <div className={styles.costDisplay}>{renderNumber(cost ?? 0)}</div>
        <div className={styles.costInfoList}>
          {costs?.map(({ name, city, quantity, label, price }) => (
            <div
              key={name + city}
              className={styles.costInfo}
              onClick={() => {
                navigator.clipboard.writeText(label || name);
              }}
            >
              <div className={styles.icon} data-quantity={quantity}>
                <Image
                  src={`https://render.albiononline.com/v1/item/${itemToImg(
                    name
                  )}.png`}
                  alt={label || name}
                  width={32}
                  height={32}
                  unoptimized
                />
              </div>
              <div className={styles.costInfoText}>
                <div>{label || name}</div>
                <div
                  className={`${styles.cityInfo} ${
                    styles[`city-${city?.replace(/\s+/g, "").toLowerCase()}`]
                  }`}
                >
                  {renderNumber(price * quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // renderTab is unused and removed

  const renderHeader = () => {
    return (
      <header className={styles.header}>
        <form
          className={styles.filters}
          onSubmit={(e) => {
            e.preventDefault();
            // handled by controlled inputs below
          }}
        >
          <label>
            Tier:
            <select
              value={filtersState.tier}
              onChange={(e) =>
                setFilters((f) => ({ ...f, tier: e.target.value }))
              }
            >
              <option value="3">T3</option>
              <option value="4">T4</option>
              <option value="5">T5</option>
              <option value="6">T6</option>
              <option value="7">T7</option>
              <option value="8">T8</option>
            </select>
          </label>
          <label>
            Enchant:
            <select
              value={filtersState.enchant}
              onChange={(e) =>
                setFilters((f) => ({ ...f, enchant: Number(e.target.value) }))
              }
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <label>
            Quality:
            <select
              value={filtersState.quality}
              onChange={(e) =>
                setFilters((f) => ({ ...f, quality: Number(e.target.value) }))
              }
            >
              <option value={1}>Normal</option>
              <option value={2}>Good</option>
              <option value={3}>Outstanding</option>
              <option value={4}>Excellent</option>
              <option value={5}>Masterpiece</option>
            </select>
          </label>
          <label>
            Exclude Cities:
            <select
              multiple
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(
                  (opt) => opt.value
                );
                setFilters((f) => ({
                  ...f,
                  withoutCity: options,
                }));
              }}
              style={{ minHeight: 80 }}
              defaultValue={filtersState.withoutCity}
            >
              <option value="">None</option>
              <option value="Black Market">Black Market</option>
              <option value="Caerleon">Caerleon</option>
              <option value="Bridgewatch">Bridgewatch</option>
              <option value="Fort Sterling">Fort Sterling</option>
              <option value="Lymhurst">Lymhurst</option>
              <option value="Martlock">Martlock</option>
              <option value="Thetford">Thetford</option>
              <option value="Brecilien">Brecilien</option>
            </select>
          </label>
          <label>
            Name:
            <input
              type="text"
              value={filtersState.name}
              onChange={(e) =>
                setFilters((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Search by name..."
              style={{ minWidth: 120 }}
              list="item-autocomplete"
              autoComplete="off"
              onFocus={(e) => e.target.select()}
            />
            <datalist id="item-autocomplete">
              {items
                .filter(
                  (item) =>
                    item.type != "ressource" &&
                    item.label &&
                    item.label
                      .toLowerCase()
                      .includes(filtersState.name.toLowerCase())
                )
                .map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.label}
                  </option>
                ))}
            </datalist>
          </label>
        </form>
      </header>
    );
  };

  const allitems = prices.filter(
    ({ buy_price_min, sell_price_min }) =>
      buy_price_min > 0 || sell_price_min > 0
  );

  const grouped = allitems.reduce<Record<string, ItemPrice[]>>((acc, item) => {
    if (!acc[item.item_id]) acc[item.item_id] = [];
    acc[item.item_id].push(item);
    return acc;
  }, {});

  const cleanItems: CleanItem[] = Object.entries(grouped).map(
    ([item_id, info]) => {
      const currentItem = getProductFromId(item_id);
      const cost = CalculCost(info, item_id);
      const sell = calcProfit(info);
      const profit = sell.price - (cost?.cost ?? 0);

      return {
        item_id,
        type: currentItem?.type,
        label: currentItem?.label,
        cost: cost?.cost,
        profit,
        costs: cost?.detail?.filter(
          (d): d is NonNullable<typeof d> => d !== undefined
        ),
        buy: calcBuy(info),
        sell,
        info: info.filter(({ quality }) => quality === filtersState.quality),
      };
    }
  );

  // Sort by profit descending, but items with display === false go to the end
  cleanItems.sort((a, b) => {
    return (b.profit ?? 0) - (a.profit ?? 0);
  });

  return (
    <div className={styles.page}>
      {renderHeader()}
      <main className={styles.main}>
        {/* <pre>{JSON.stringify(filtersState, null, 2)}</pre> */}
        <div className={styles.column}>
          <div className={styles.columnItem}>
            {allitems.length === 0 ? (
              <p>Loading...</p>
            ) : (
              renderItems(cleanItems.filter(({ type }) => type !== "ressource"))
            )}
          </div>
          <div className={styles.columnItem}>
            {allitems.length === 0 ? (
              <p>Loading...</p>
            ) : (
              renderItems(cleanItems.filter(({ type }) => type === "ressource"))
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );

  function formatTimeAgo(dateString: string): string {
    if (!dateString || dateString === "0001-01-01T00:00:00") return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  }
}
