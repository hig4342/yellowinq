<script lang="ts">
  import { add } from 'date-fns'
  import * as am5 from '@amcharts/amcharts5'
  import * as am5xy from '@amcharts/amcharts5/xy'
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
	import { onMount } from 'svelte';
  
  let chartElement: HTMLDivElement
  let rootRef: am5.Root
  let chartRef: am5xy.XYChart
  const startDate = new Date()

  onMount(() => {
    const root = am5.Root.new(chartElement)

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true,
        layout: root.verticalLayout
      }) 
    );

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      groupData: true,
      groupIntervals: [
        { timeUnit: "day", count: 1},
        { timeUnit: "month", count: 1 },
        { timeUnit: "year", count: 1 }
      ],
      maxDeviation: 0.05,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50,
    }))
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      behavior: "none"
    }));
    cursor.lineY.set("visible", false)

    for(let i=0; i<5; i++) {
      let yRenderer = am5xy.AxisRendererY.new(root, {
          opposite: i !== 0,
        })
      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: yRenderer,
      }));

      if (chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", chart.yAxes.getIndex(0) as am5xy.ValueAxis<am5xy.AxisRenderer>);
      }
      
      let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series " + i,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "time",
        legendValueText: "{valueY}",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      }))

      series.strokes.template.setAll({ strokeWidth: 1 })
      yRenderer.grid.template.set("strokeOpacity", 0.05)
      yRenderer.labels.template.set("fill", series.get("fill"))
      yRenderer.setAll({
        stroke: series.get('fill'),
        strokeOpacity: 1,
        opacity: 1,
      })

      const data = generateDatas(1000, 10*(i+1), 10**(i+1))

      if(i === 0) {
        let sbxAxis = scrollbar.chart.xAxes.push(
          am5xy.DateAxis.new(root, {
            groupData: true,
            // groupIntervals: [
            //   { timeUnit: "day", count: 1 },
            //   { timeUnit: "week", count: 1 },
            //   { timeUnit: "month", count: 1000 },
            //   { timeUnit: "year", count: 1 },
            // ],
            baseInterval: { timeUnit: 'day', count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {
              opposite: false,
              strokeOpacity: 0
            })
          })
        );

        let sbyAxis = scrollbar.chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
          })
        )

        let sbseries = scrollbar.chart.series.push(
          am5xy.LineSeries.new(root, {
            xAxis: sbxAxis,
            yAxis: sbyAxis,
            valueYField: "value",
            valueXField: "time"
          })
        )
        sbseries.data.setAll(data)
      }
      series.data.setAll(data)
    }

    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
      width: 200,
      paddingLeft: 15,
      height: am5.percent(100),
    }));

    legend.itemContainers.template.events.on("click", (e) => {
      let itemContainer = e.target
      let series = itemContainer.dataItem?.dataContext as am5xy.LineSeries
      chart.yAxes.each((axix) => {
        if(series === axix.series.at(0)) {
          axix.setAll({ visible: series.isHidden() })
        }
      })
    })

    legend.itemContainers.template.events.on("pointerover", (e) => {
      let itemContainer = e.target;

      // As series list is data of a legend, dataContext is series
      let series = itemContainer.dataItem?.dataContext as am5xy.LineSeries
      chart.series.each((chartSeries) => {
        const currentSeries = chartSeries as am5xy.LineSeries
        if (currentSeries != series) {
          currentSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000)
          });
        } else {
          currentSeries.strokes.template.setAll({
            strokeWidth: 3
          });
        }
      })
    })

    legend.itemContainers.template.events.on("pointerout", (e) => {
      chart.series.each((chartSeries) => {
        const currentSeries = chartSeries as am5xy.LineSeries
        currentSeries.strokes.template.setAll({
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: chartSeries.get("fill")
        });
      });
    })

    legend.data.setAll(chart.series.values)

    rootRef = root
    chartRef = chart

    return () => {
      root.dispose()
    }
  })

  const generateData = (i: number, min: number, range: number) => {
    const value = Math.round(Math.random() * range + min)
    const time = am5.time.add(add(startDate, { days: i }), "day", 1).getTime()
    return {
      value,
      time
    }
  }

  const generateDatas = (count: number, min: number, range: number) => {
    const data = []
    for (let i=0; i<count; i++) {
      data.push(generateData(i, min, range))
    }
    return data
  }
</script>

<div bind:this={chartElement} style="width: 100%; height: 500px" />