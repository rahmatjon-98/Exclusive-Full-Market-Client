import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const CountdownTimer = ({ timeAll = 345200, className }) => {
  console.log("CountdownTimer");

  const { t } = useTranslation();
  const [time, setTime] = useState(timeAll);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = useMemo(() => {
    const d = Math.floor(time / (60 * 60 * 24));
    const h = Math.floor((time % (60 * 60 * 24)) / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return { days: d, hours: h, minutes: m, seconds: s };
  }, [time]);

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <div>
        <span className="text-[12px] font-medium">{t("Flash.3")}</span>
        <p className="text-[32px] font-bold">{String(days).padStart(2, "0")}</p>
      </div>
      <span className="text-[#E07575] text-[30px] pb-1">:</span>

      <div>
        <span className="text-[12px] font-medium">{t("Flash.4")}</span>
        <p className="text-[32px] font-bold">
          {String(hours).padStart(2, "0")}
        </p>
      </div>
      <span className="text-[#E07575] text-[30px] pb-1">:</span>

      <div>
        <span className="text-[12px] font-medium">{t("Flash.5")}</span>
        <p className="text-[32px] font-bold">
          {String(minutes).padStart(2, "0")}
        </p>
      </div>
      <span className="text-[#E07575] text-[30px] pb-1">:</span>

      <div>
        <span className="text-[12px] font-medium">{t("Flash.6")}</span>
        <p className="text-[32px] font-bold">
          {String(seconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CountdownTimer);
